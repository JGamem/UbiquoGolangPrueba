package handlers

import (
	"net/http"
	"ubiquogo/mongodb"

	"github.com/labstack/echo/v4"
)

func GetGender(c echo.Context) error {
	h := mongodb.GetGender()

	if len(h) < 1 {
		return c.NoContent(http.StatusInternalServerError)
	}

	return c.JSON(http.StatusOK, h)
}
