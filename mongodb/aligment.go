package mongodb

import (
	"context"
	"log"
	"ubiquogo/model"

	"go.mongodb.org/mongo-driver/bson"
)

func GetAligment() []model.Alignment {
	ctx := context.Background()
	client := Connection()
	collection := client.Database("heroes").Collection("alignment")
	cur, err := collection.Find(ctx, bson.D{})
	if err != nil {
		log.Fatalln(err)
	}
	defer cur.Close(ctx)

	var a []model.Alignment
	if err = cur.All(ctx, &a); err != nil {
		log.Fatalln(err)
	}

	return a
}
