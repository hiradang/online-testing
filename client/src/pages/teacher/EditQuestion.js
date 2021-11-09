import React from "react";
import axios from "axios";

class EditQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allowEditQuestion : true,
        }
    }

    questionContent = this.props.question.questionContent;
    result = this.props.question.result;
    choice1 = this.props.question.choice1;
    choice2 = this.props.question.choice2;
    choice3 = this.props.question.choice3;
    questionId = this.props.question.id;

    handleEditButton(e) {
        if (this.state.allowEditQuestion) {
            this.setState({allowEditQuestion: false})
            e.target.innerHTML = "Xong"
        } else {
            this.setState({allowEditQuestion: true})
            e.target.innerHTML = "Sửa câu hỏi"


            // Send POST request
            let edittedQuestion = {
                id: this.props.question.id,
                examId: this.props.question.examId,
                questionContent: this.questionContent,
                result: this.result,
                choice1: this.choice1,
                choice2: this.choice2,
                choice3: this.choice3,
            }
            axios.post(`http://localhost:3001/admin/manage/questions/{questionId}`, edittedQuestion)
                .then((res) => {
                    window.alert("Sửa câu hỏi thành công!")
                })
        }
    }

    render() {
        return (
            <div>
                <button onClick={this.handleEditButton.bind(this)}>
                    Sửa câu hỏi
                </button>
                <fieldset className="questionContainer" disabled={this.state.allowEditQuestion}>
                    <label>Câu hỏi số: {this.props.keyQuestion + 1}</label>
                    <input
                        class="inputCreateExam questionContent"
                        name={`questionContent[${this.props.keyQuestion}]`}
                        required
                        defaultValue={this.props.question.questionContent}
                        onBlur={e => this.questionContent = e.target.value}
                    />

                    <label>Đáp án</label>
                    <input
                        class="result"
                        name={`result[${this.props.keyQuestion}]`}
                        required
                        defaultValue={this.props.question.result}
                        onBlur={e => this.result = e.target.value}
                    />

                    <label>Lựa chọn 1</label>
                    <input
                        class="choice1"
                        name={`choice1[${this.props.keyQuestion}]`}
                        required
                        defaultValue={this.props.question.choice1}
                        onBlur={e => this.choice1 = e.target.value}
                    />

                    <label>Lựa chọn 2</label>
                    <input
                        class="choice2"
                        name={`choice2[${this.props.keyQuestion}]`}
                        required
                        defaultValue={this.props.question.choice2}
                        onBlur={e => this.choice2 = e.target.value}
                    />

                    <label>Lựa chọn 3</label>
                    <input
                        class="choice3"
                        name={`choice3[${this.props.keyQuestion}]`}
                        required
                        defaultValue={this.props.question.choice3}
                        onBlur={e => this.choice3 = e.target.value}
                    />
                </fieldset>
            </div>
        )
    }
}

export default EditQuestion;