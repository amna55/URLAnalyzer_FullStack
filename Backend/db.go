package main

import (
	"database/sql"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

var DB *sql.DB

func InitDB() {
	var err error
	dsn := "myuser:mypassword@tcp(127.0.0.1:3306)/url_analyzer"
	DB, err = sql.Open("mysql", dsn)
	if err != nil {
		log.Fatal("Database connection error:", err)
	}

	err = DB.Ping()
	if err != nil {
		log.Fatal("Database unreachable:", err)
	}

	createTableQuery := `
	CREATE TABLE IF NOT EXISTS url_analysis (
		url VARCHAR(512) PRIMARY KEY,
		title TEXT,
		html_version VARCHAR(10),
		internal_links INT,
		external_links INT,
		broken_links INT,
		has_login_form BOOLEAN,
		h1_count INT,
		h2_count INT,
		h3_count INT,
		h4_count INT
	);`
	if _, err := DB.Exec(createTableQuery); err != nil {
		log.Fatal("Failed to create table:", err)
	}
}
