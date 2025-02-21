package config

import (
	"fmt"
	"log"

	"lms/backend/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

// ConnectDatabase establishes a connection to PostgreSQL.
// Adjust the DSN below with your Ubuntu PostgreSQL credentials.
func ConnectDatabase() {
	// For an Ubuntu machine with user "ubuntu" and database "ubuntu".
	dsn := "host=localhost user=ubuntu password=ubuntu dbname=ubuntu port=5432 sslmode=disable"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database: ", err)
	}
	DB = db

	// Auto-migrate all models.
	err = db.AutoMigrate(
		&models.Library{},
		&models.User{},
		&models.Book{},
		&models.RequestEvent{},
		&models.IssueRegistry{},
	)
	if err != nil {
		log.Fatal("Failed to migrate database: ", err)
	}
	fmt.Println("Database connected and migrated.")
}
