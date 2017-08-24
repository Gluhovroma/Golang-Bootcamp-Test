package main

import (
	"net/http"
	"github.com/gorilla/mux"
	"strconv"
	"math"
	"encoding/json"
)	

type MyResponse struct {
    Status    string `json:"status"`
    Distance string `json:"distance"`
    Message string `json:"message"`
}

func main() {
	
	// http.Handle("/", http.FileServer(http.Dir("./client/dist")))
	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/api/checkDistance/{lng1}/{lat1}/{lng2}/{lat2}", CheckDistance)
	router.PathPrefix("/").Handler(http.FileServer(http.Dir("./client/dist")))
	http.Handle("/", router)
	http.ListenAndServe(":3000", nil)
}

func CheckDistance(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	lat1, err := strconv.ParseFloat(vars["lat1"], 64)
	if err != nil { 
		response := MyResponse{Status: "error", Message: "Ошибка координат"}
		json.NewEncoder(w).Encode(response)
	}
	lat2, err := strconv.ParseFloat(vars["lat2"], 64)
	if err != nil { 
		response := MyResponse{Status: "error", Message: "Ошибка координат"}
		json.NewEncoder(w).Encode(response)
	}
	lon1, err := strconv.ParseFloat(vars["lng1"], 64)
	if err != nil { 
		response := MyResponse{Status: "error", Message: "Ошибка координат"}
		json.NewEncoder(w).Encode(response)
	}
	lon2, err := strconv.ParseFloat(vars["lng2"], 64)
	if err != nil { 
		response := MyResponse{Status: "error", Message: "Ошибка координат"}
		json.NewEncoder(w).Encode(response)
	}
	var distance = strconv.FormatFloat(Distance(lat1, lon1, lat2, lon2), 'f', 6, 64)
	response := MyResponse{ Status: "success", Distance: distance }
    json.NewEncoder(w).Encode(response)
}

func Distance(lat1, lon1, lat2, lon2 float64) float64 {
	// convert to radians
  // must cast radius as float to multiply later
	var la1, lo1, la2, lo2, r float64
	la1 = lat1 * math.Pi / 180
	lo1 = lon1 * math.Pi / 180
	la2 = lat2 * math.Pi / 180
	lo2 = lon2 * math.Pi / 180
	r = 6378100 // Earth radius in METERS
	// calculate
	h := hsin(la2-la1) + math.Cos(la1)*math.Cos(la2)*hsin(lo2-lo1)
	return 2 * r * math.Asin(math.Sqrt(h))
}

func hsin(theta float64) float64 {
	return math.Pow(math.Sin(theta/2), 2)
}


