package handlers

import (
	"net/http"
	"ubiquogo/mongodb"

	"github.com/labstack/echo/v4"
)

func GetAligment(c echo.Context) error {
	h := mongodb.GetAligment()

	if len(h) < 1 {
		return c.NoContent(http.StatusInternalServerError)
	}

	return c.JSON(http.StatusOK, h)
}
