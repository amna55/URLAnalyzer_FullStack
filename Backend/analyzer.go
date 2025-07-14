package main

import (
	"strings"

	"golang.org/x/net/html"
)

// 👇 Only walkHTML, no struct here!
func walkHTML(n *html.Node, result *AnalyzeResponse) {
	if n.Type == html.ElementNode {
		switch n.Data {
		case "title":
			if n.FirstChild != nil {
				result.Title = n.FirstChild.Data
			}
		case "html":
			for _, attr := range n.Attr {
				if attr.Key == "lang" {
					result.HTMLVersion = "HTML5"
				}
			}
		case "a":
			for _, attr := range n.Attr {
				if attr.Key == "href" {
					href := attr.Val
					if strings.HasPrefix(href, "http") {
						if strings.Contains(href, result.URL) {
							result.InternalLinks++
						} else {
							result.ExternalLinks++
						}
					}
				}
			}
		case "form":
			for _, attr := range n.Attr {
				if attr.Key == "action" && strings.Contains(attr.Val, "login") {
					result.HasLoginForm = true
				}
			}
		case "h1":
			result.H1Count++
		case "h2":
			result.H2Count++
		case "h3":
			result.H3Count++
		case "h4":
			result.H4Count++
		}
	}

	for child := n.FirstChild; child != nil; child = child.NextSibling {
		walkHTML(child, result)
	}
}
