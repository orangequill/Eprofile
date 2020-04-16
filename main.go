package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"io/ioutil"
	"net/http"
)

// PSSQuestion - This struct holds the PercievedStressScale json objects
type PSSQuestion struct {
	Idx         string `json:"num"`
	Question    string `json:"question"`
	Description string `json:"description"`
}

// PSSAnswer - This struct holds the PercievedStressScale json answers
type PSSAnswer struct {
	Idx         string `json:"num"`
	Question    string `json:"question"`
	Description string `json:"description"`
}

// TrackEmotion - This struct holds an emotion instance
type TrackEmotion struct {
	X           string `json:"x"`
	Y           string `json:"y"`
	Description string `json:"description"`
	Time        string `json:"time"`
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
	content, err := ioutil.ReadFile("/Assets/Resources/PerceivedStressScale.json")
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

	template, _ := template.ParseFiles("/Assets/studentSurvey.html")
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	err3 := template.Execute(w, name)
	if err3 != nil {
		panic(err3)
	}
}

// func selfQuestionaireSurveyPOST(w http.ResponseWriter, r *http.Request) {
// 	var PSSAnswers []PSSAnswer

// 	switch r.Method {

// 	case "POST":
// 		if err := json.NewDecoder(r.Body).Decode(&PSSAnswers); err != nil {
// 			http.Error(w, "boo", 500)
// 		}
// 	default:
// 		http.Error(w, "Not supported method", 405)
// 	}

// 	for _, x := range PSSAnswers {
// 		fmt.Fprint(x.Idx, x.Question, x.Description)
// 	}
// }

// func peerQuestionaireSurveyPOST(w http.ResponseWriter, r *http.Request) {
// 	var PSSAnswers []PSSAnswer

// 	switch r.Method {

// 	case "POST":
// 		if err := json.NewDecoder(r.Body).Decode(&PSSAnswers); err != nil {
// 			http.Error(w, "boo", 500)
// 		}
// 	default:
// 		http.Error(w, "Not supported method", 405)
// 	}

// 	for _, x := range PSSAnswers {
// 		fmt.Fprint(x.Idx, x.Question, x.Description)
// 	}
// }

// func educatorQuestionaireSurveyPOST(w http.ResponseWriter, r *http.Request) {
// 	var PSSAnswers []PSSAnswer

// 	switch r.Method {

// 	case "POST":
// 		if err := json.NewDecoder(r.Body).Decode(&PSSAnswers); err != nil {
// 			http.Error(w, "boo", 500)
// 		}
// 	default:
// 		http.Error(w, "Not supported method", 405)
// 	}

// 	for _, x := range PSSAnswers {
// 		fmt.Fprint(x.Idx, x.Question, x.Description)
// 	}
// }

// func trackEmotionPOST(w http.ResponseWriter, r *http.Request) {
// 	var TrackEmotion emo

// 	switch r.Method {

// 	case "POST":
// 		if err := json.NewDecoder(r.Body).Decode(&emo); err != nil {
// 			http.Error(w, "boo", 500)
// 		}
// 	default:
// 		http.Error(w, "Not supported method", 405)
// 	}

// 	fmt.Fprint(emo.X, emo.Y, emo.Description)
// }

func main() {
	// router := mux.NewRouter().StrictSlash(true)

	assetHandle := http.FileServer(http.Dir("./Assets/"))
	http.StripPrefix("/Assets/Styles/", http.FileServer(http.Dir("./Assets/Styles/")))
	http.StripPrefix("/Assets/Scripts/", http.FileServer(http.Dir("./Assets/Scripts/")))
	http.Handle("/", http.StripPrefix("/Assets/", assetHandle))

	// router.HandleFunc("/Assets/studentSurvey/", selfQuestionaireSurveyPOST).Methods("POST")
	// router.HandleFunc("/Assets/peerSurvey/", selfQuestionaireSurveyPOST).Methods("POST")
	// router.HandleFunc("/Assets/educatorSurvey/", selfQuestionaireSurveyPOST).Methods("POST")

	// http.HandleFunc("/studentSurvey/", selfQuestionHandler)

	http.ListenAndServe(":8080", nil)
}
