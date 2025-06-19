package main

import (
	"fmt"
	"os"

	"github.com/ShashaankS/GoEdit/backend/controllers"
	"github.com/ShashaankS/GoEdit/backend/initializers"
	"github.com/ShashaankS/GoEdit/backend/middleware"
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDb()
	initializers.SyncDatabase()
} 

func main() {
	fmt.Printf("Starting the server at %s", os.Getenv("PORT"))
	router := gin.Default()
	
	router.Use(cors.New(cors.Config{
		// AllowOrigins:     []string{os.Getenv("FRONTEND_URL")},
		AllowAllOrigins: true,
		AllowMethods:     []string{"POST", "GET", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		AllowCredentials: true,
	}))
	
	router.POST("/signup", controllers.Signup)
	router.POST("/signin", controllers.Signin)
	router.GET("/validate", middleware.RequireAuth, controllers.Validate)
	router.Run()
}