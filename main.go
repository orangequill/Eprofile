package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"io/ioutil"
	"log"
	"mime"
	"net/http"
)

// PSSQuestion - This struct holds the PercievedStressScale json objects
type PSSQuestion struct {
	Idx         string `json:"num"`
	Question    string `json:"question"`
	Description string `json:"description"`
}

type message struct {
	Message string `json:"msg"`
}

// Name - test name
type Name struct {
	Fname string
}

func selfQuestionHandler(w http.ResponseWriter, r *http.Request) {
	// Open our jsonFile
	content, err := ioutil.ReadFile("/Repositories/EProfile/Resources/PerceivedStressScale.json")
	if err != nil {
		fmt.Println(err.Error())
	}

	var PSSQuestions []PSSQuestion
	err2 := json.Unmarshal(content, &PSSQuestions)

	if err2 != nil {
		fmt.Println("Error JSON Unmarshalling")
		fmt.Println(err2.Error())
	}

	var outStr string
	for _, x := range PSSQuestions {
		outStr += "<label>" + x.Question + "</label>\n <h3>" + x.Description + "</h3>"
	}

	name := Name{outStr}

	template, _ := template.ParseFiles("/Repositories/EProfile/templates/studentSurvey.html")
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	err3 := template.Execute(w, name)
	if err3 != nil {
		panic(err3)
	}
}

func serveAssets(w http.ResponseWriter, req *http.Request) {
	path := "." + req.URL.Path
	mime.AddExtensionType(".css", "text/css; charset=utf-8")
	mime.AddExtensionType(".js", "application/javascript; charset=utf-8")
	log.Printf("path" + path)
	http.FileServer(http.Dir(path))
}

// func serveJS(w http.ResponseWriter, req *http.Request) {
// 	path := "./Scripts" //+ req.URL.Path
// 	mime.AddExtensionType(".js", "application/javascript; charset=utf-8")
// 	http.FileServer(http.Dir(path))
// }

func main() {
	http.HandleFunc("/studentSurvey/", selfQuestionHandler)
	http.HandleFunc("/", serveAssets)
	http.ListenAndServe(":8080", nil)
}
