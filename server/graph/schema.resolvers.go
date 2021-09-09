package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/gnomon-church/mona-api/graph/generated"
	"github.com/gnomon-church/mona-api/graph/model"
	"github.com/gnomon-church/mona-api/internal/books"
	"github.com/gnomon-church/mona-api/internal/games"
	"github.com/gnomon-church/mona-api/internal/shipments"
)

func (r *mutationResolver) CreateShipment(ctx context.Context, input model.NewShipment) (*model.Shipment, error) {
	var shipment shipments.Shipment
	shipment.ShipmentID = input.ShipmentID
	shipment.DateReceived = input.DateReceived
	shipment.AddShipment()
	return &model.Shipment{ShipmentID: shipment.ShipmentID, DateReceived: shipment.DateReceived}, nil
}

func (r *mutationResolver) CreateGameType(ctx context.Context, input model.UpdateGameType) (*model.GameType, error) {
	var game games.GameType
	game.GameID = input.GameID
	game.TicketValue = input.TicketValue
	game.TicketName = input.TicketName
	game.BookValue = input.BookValue
	game.CurrentGame = input.CurrentGame
	err := game.CreateGame()
	return &model.GameType{GameID: game.GameID, TicketValue: game.TicketValue, TicketName: game.TicketName, BookValue: game.BookValue, CurrentGame: game.CurrentGame}, err
}

func (r *mutationResolver) ModifyGameType(ctx context.Context, input model.UpdateGameType) (*model.GameType, error) {
	var game games.GameType
	game.GameID = input.GameID
	game.TicketValue = input.TicketValue
	game.TicketName = input.TicketName
	game.BookValue = input.BookValue
	game.CurrentGame = input.CurrentGame
	err := game.ModifyGame()
	return &model.GameType{GameID: game.GameID, TicketValue: game.TicketValue, TicketName: game.TicketName, BookValue: game.BookValue, CurrentGame: game.CurrentGame}, err
}

func (r *mutationResolver) RemoveGameType(ctx context.Context, input model.RemoveGameType) (*model.GameType, error) {
	var game games.GameType
	game.GameID = input.GameID
	err := game.RemoveGame()
	fmt.Print("Error: ", err)
	return &model.GameType{GameID: game.GameID}, err
}

func (r *mutationResolver) AddGameBook(ctx context.Context, input []*model.AddGameBook) ([]*model.GameBook, error) {
	var book books.GameBook
	var res []*model.GameBook
	var err error
	for i := 0; i < len(input); i++ {
		book.GameID = input[i].GameID
		book.BookNumber = input[i].BookNumber
		book.ShipmentID = input[i].ShipmentID
		err = book.AddBook()
		if err != nil {
			break
		}
		res = append(res, &model.GameBook{GameID: book.GameID, BookNumber: book.BookNumber, ShipmentID: book.ShipmentID})
	}
	return res, err
}

func (r *mutationResolver) SignOutGameBook(ctx context.Context, input []*model.SignOutGameBook) ([]*model.GameBook, error) {
	var book books.GameBook
	var res []*model.GameBook
	var err error
	for i := 0; i < len(input); i++ {
		book.GameID = input[i].GameID
		book.BookNumber = input[i].BookNumber
		book.SignOutDate = input[i].SignOutDate
		err = book.SignOutBook()
		if err != nil {
			break
		}
		res = append(res, &model.GameBook{GameID: book.GameID, BookNumber: book.BookNumber, SignOutDate: book.SignOutDate})
	}
	return res, err
}

func (r *queryResolver) Shipments(ctx context.Context, shipmentID *string, dateReceived *string) ([]*model.Shipment, error) {
	var resultShipments []*model.Shipment
	var dbShipments []shipments.Shipment
	dbShipments, err := shipments.GetShipments(shipmentID, dateReceived)
	for _, shipment := range dbShipments {
		resultShipments = append(resultShipments, &model.Shipment{ShipmentID: shipment.ShipmentID, DateReceived: shipment.DateReceived})
	}
	return resultShipments, err
}

func (r *queryResolver) GameTypes(ctx context.Context, gameID *string, currentGame *bool) ([]*model.GameType, error) {
	var resultGameTypes []*model.GameType
	var dbGameTypes []games.GameType
	dbGameTypes, err := games.GetGames(gameID, currentGame)
	for _, game := range dbGameTypes {
		resultGameTypes = append(resultGameTypes, &model.GameType{GameID: game.GameID, TicketValue: game.TicketValue, TicketName: game.TicketName, BookValue: game.BookValue, CurrentGame: game.CurrentGame})
	}
	return resultGameTypes, err
}

func (r *queryResolver) GameBooks(ctx context.Context, gameID *string, bookNumber *string, shipmentID *string, signOutDate *string) ([]*model.GameBook, error) {
	var resultGameBooks []*model.GameBook
	var dbGameBooks []books.GameBook
	dbGameBooks, err := books.GetBooks(gameID, bookNumber, shipmentID, signOutDate)
	for _, book := range dbGameBooks {
		resultGameBooks = append(resultGameBooks, &model.GameBook{GameID: book.GameID, BookNumber: book.BookNumber, ShipmentID: book.ShipmentID, SignOutDate: book.SignOutDate})
	}
	return resultGameBooks, err
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
