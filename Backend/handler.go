package main

import (
	"net/http"
	"net/url"
	"strings"

	"github.com/gin-gonic/gin"
	"golang.org/x/net/html"
)

type AnalyzeRequest struct {
	URL string `json:"url"`
}

func AnalyzeURLHandler(c *gin.Context) {
	var req AnalyzeRequest
	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON"})
		return
	}

	// Normalize: add http:// if missing
	rawUrl := strings.TrimSpace(req.URL)
	if !strings.HasPrefix(rawUrl, "http://") && !strings.HasPrefix(rawUrl, "https://") {
		rawUrl = "http://" + rawUrl
	}

	// Validate
	parsedURL, err := url.ParseRequestURI(rawUrl)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid URL format"})
		return
	}

	// Fetch HTML
	resp, err := http.Get(parsedURL.String())
	if err != nil || resp.StatusCode >= 400 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to fetch the URL"})
		return
	}
	defer resp.Body.Close()

	doc, err := html.Parse(resp.Body)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse HTML"})
		return
	}

	// Analyze
	result := AnalyzeResponse{
		URL: parsedURL.String(),
	}
	walkHTML(doc, &result)

	// Save to DB
	_, err = DB.Exec(`
		INSERT INTO url_analysis (
			url, title, html_version, internal_links, external_links, broken_links, 
			has_login_form, h1_count, h2_count, h3_count, h4_count
		) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
		ON DUPLICATE KEY UPDATE 
			title=VALUES(title), html_version=VALUES(html_version),
			internal_links=VALUES(internal_links), external_links=VALUES(external_links),
			broken_links=VALUES(broken_links), has_login_form=VALUES(has_login_form),
			h1_count=VALUES(h1_count), h2_count=VALUES(h2_count), 
			h3_count=VALUES(h3_count), h4_count=VALUES(h4_count)
	`,
		result.URL, result.Title, result.HTMLVersion,
		result.InternalLinks, result.ExternalLinks, result.BrokenLinks,
		result.HasLoginForm, result.H1Count, result.H2Count,
		result.H3Count, result.H4Count,
	)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to store result in DB"})
		return
	}

	c.JSON(http.StatusOK, result)
}
