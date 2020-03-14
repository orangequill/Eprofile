package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"io/ioutil"
	"net/http"
	"os"
)

// PSSQuestion - This struct holds the PercievedStressScale json objects
type PSSQuestion struct {
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
	w.Header().Set("Content-Type", "text/html")
	fmt.Fprint(w, "<h1>Survey - Student</h1>")
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

	for _, x := range PSSQuestions {
		fmt.Fprint(w, "<label>"+x.Question+"</label>\n <h3>"+x.Description+"</h3>")
	}
	template, _ := template.ParseFiles("/Repositories/EProfile/templates/studentSurvey.html")
	err3 := template.Execute(w, err2)
	if err3 != nil {
		panic(err3)
	}
}

func main() {

	/*// Open our jsonFile
	content, err := ioutil.ReadFile("/Repositories/EProfile/Resources/PerceivedStressScale.json")
	if err != nil {
		fmt.Println(err.Error())
	}

	var PSSQuestions []PSSQuestion
	err2 := json.Unmarshal(content, &PSSQuestions)

	//fmt.Print(PSSQuestions)

	if err2 != nil {
		fmt.Println("Error JSON Unmarshalling")
		fmt.Println(err2.Error())
	}
	*/
	name := Name{"John"}
	template, _ := template.ParseFiles("/Repositories/EProfile/templates/test.html")
	err3 := template.Execute(os.Stdout, name)
	if err3 != nil {
		panic(err3)
	}
	//http.HandleFunc("/", selfQuestionHandler)
	//http.ListenAndServe(":8080", nil)
}
