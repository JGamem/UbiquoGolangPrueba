package main

import (
	"ubiquogo/handlers"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	e := echo.New()

	// Configuración CORS
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins:  []string{"*"},
		AllowMethods:  []string{echo.GET, echo.POST, echo.PUT, echo.DELETE},
		AllowHeaders:  []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept, echo.HeaderAuthorization},
		ExposeHeaders: []string{echo.HeaderAuthorization},
	}))

	e.GET("/heroes", handlers.GetHeroes)
	e.GET("/gender", handlers.GetGender)
	e.GET("/aligment", handlers.GetAligment)
	e.GET("/publishers", handlers.GetPublisher)
	e.POST("/heroes", handlers.AddHero)
	e.DELETE("/heroes/:id", handlers.DeleteHero)
	e.PUT("/heroes/:id", handlers.UpdateHero)
	e.Logger.Fatal(e.Start(":1323"))
}
