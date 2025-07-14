package main

import "github.com/gin-gonic/gin"

type AnalyzeResponse struct {
	URL           string `json:"url"`
	Title         string `json:"title"`
	HTMLVersion   string `json:"html_version"`
	InternalLinks int    `json:"internal_links"`
	ExternalLinks int    `json:"external_links"`
	BrokenLinks   int    `json:"broken_links"`
	HasLoginForm  bool   `json:"has_login_form"`
	H1Count       int    `json:"h1_count"`
	H2Count       int    `json:"h2_count"`
	H3Count       int    `json:"h3_count"`
	H4Count       int    `json:"h4_count"`
}

func main() {
	InitDB() // ✅ Initialize DB

	r := gin.Default()
	r.POST("/analyze", AnalyzeURLHandler) // ✅ Use our handler
	r.Run(":8081")
}
