import { Node } from "react-flow-renderer";
import { IInputSequence } from "../interfaces/menu";
import { generateRandomSessionId } from "../pages/menu_test/utils";
import { api, SendNotification } from "../plugins"
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addInputSequenceValues, addMenutestEdges, addMenutestNodes, clearMenutestEdges, clearMenutestNodes, setCurrentTelcoContent, setInputSequences, setInputSequenceValues, setRunningInputSequence } from "../store/slices/MenuTestSlice";
import { store } from "../store/store";
// import {getRequestBody, generateRandomSessionId} from ''



export const fetchMenus = async (countryCode: string, env: string, shortCode: string) =>  api.post(`/external/fetch`, { countryCode, shortCode, env })
        .then( response => {
            console.log(response);
            if (response.data.status){
                SendNotification({
                    title: "Success",
                    message: "Menu fetched successfully!",
                    type: 'success',
                })
            } else {
                SendNotification({
                    title: "Error",
                    message: "Error fetching menus",
                    type: 'danger',
                })
            }
            
            return response.data
        })
        .catch( error => {
            console.log(error);
        })


export const buildMenus = async (countryCode: string, env: string, shortCode: string) =>  api.post(`/external/build`, { countryCode, shortCode })
    .then( response => {
        console.log(response);
        return response.data
    })
    .catch( error => {
        console.log(error);
    })




export class MenuTestApiService {


    private _dispatch = useAppDispatch()


    public clearInputHistory = () => {
        this._dispatch(setInputSequenceValues([]))
    }

    public setInputHistory = (value: Array<string>) => {
        this._dispatch(setInputSequenceValues(value))
    }

    public addInputHistory = (value: Array<string>) => {
        this._dispatch(addInputSequenceValues(value))
    }

    public clearNodesAndEdges = () => {
        this._dispatch(clearMenutestNodes())
        this._dispatch(clearMenutestEdges())
    }

    public setTelcoContent = (value: string) => {
        this._dispatch(setCurrentTelcoContent(value))
    }

    public generate_random_string = () => {
        let new_session_id = generateRandomSessionId()
        return new_session_id
    }

    private attachLastScreen = (user_input: string, content: string) => {

        let _state = store.getState()
        console.log(_state.menu_test.nodes);
        
        const last_node = _state.menu_test.nodes.at(-1)
        const node_to_create: Node = {
            id: this.generate_random_string() ,
            type: 'node_test',
            position: { x: last_node?.position.x! + 500, y: 100 },
            data: {
              label: "eertyuiop",
              content: content
            },
        };

        this._dispatch(addMenutestNodes(node_to_create))

        this._dispatch(addMenutestEdges(
            {
                id: this.generate_random_string(),
                source: last_node!.id,
                target: node_to_create.id,
                animated: true,
                label: user_input,
              },
        ))
    }

    public sendRequestToTelco = async (user_input: string, session_id: string, msisdn: string, env: string, country_code: string ) => {

        api.post(`/external/equitel/`, { user_input, session_id, msisdn, country_code, env: env.toLowerCase() } )
        .then( async (response) => {
            // console.log(response);
            let response_text = await response.data
            // var content = this.betweenMarkers(response_text)
            this.setTelcoContent(response_text)
            this.addInputHistory([user_input])
            this.attachLastScreen(user_input, response_text)
        })
        .catch( error => {
            console.log(error);
        })

    }


    public runInputSequence = async (input_sequence: string, session_id: string, phoneNumber: string, env: string, input_sequence_id: number = 0, country_code: string) => {

        if (input_sequence_id !== 0) {
            this._dispatch(setRunningInputSequence(input_sequence_id))
        }

        let input_arr = input_sequence.split(',')
        // console.log('squence is ', input_arr);
        
        
        if (input_sequence !== "" && input_arr[0] !== "") {
            // console.log(input_arr[0]);
            this.sendRequestToTelco(input_arr[0], session_id, phoneNumber, env, country_code)
            .then( response => {
                setTimeout(() => {
                    input_arr = input_arr.slice(1, input_arr.length)                
                    this.runInputSequence(input_arr.toString(), session_id, phoneNumber, env, 0, country_code)
                }, 5000);
            })
        } else {
            this._dispatch(setRunningInputSequence(null))
        }
        
    }

    public saveSequence = async (input_history: string, name: string, description: string) => {
        
        
        api.post(`/external/input_sequence/`, { name: name, description: description, inputs: input_history} )
            .then( async (response) => {
                console.log(response);
                this.fetch_input_sequence()
            })
            .catch( error => {
                console.log(error);
                SendNotification({
                    title: "Error",
                    message: error.response.data.error,
                    type: "danger"
                })
            })

    }

    public deleteSequence = async (id: number) => {
        
        api.delete(`/external/input_sequence/${id}` )
            .then( async (response) => {
                this.fetch_input_sequence()
                SendNotification({
                    title: 'Success',
                    message: "Deleted successfully!",
                    type: "success"
                })
            })
            .catch( error => {
                console.log(error);
                SendNotification({
                    title: "Error",
                    message: error.response.data.error,
                    type: "danger"
                })
            })

    }

    public fetch_input_sequence = async () => {
        api
        .get(`/external/input_sequence/`)
        .then(async (response) => {
            console.log(response);
            this._dispatch(setInputSequences(response.data.data))
        })
        .catch((error) => {
            console.log(error);
            SendNotification({
            title: "Error",
            message: "Error saving the sequence, please try again!",
            type: "danger",
            });
        });
    };


    private betweenMarkers = function(text: string) {
        var begin = '<value>'
        var end = '</value>'
        var firstChar = text.indexOf(begin) + begin.length;
        var lastChar = text.indexOf(end);
        var newText = text.substring(firstChar, lastChar);
        return newText;
    }


    private getRequestBody = function(user_input: string, session_id: string, msisdn: string) {
        const request_body = `
                <USSDDynMenuRequest>
                    <requestId>${session_id}</requestId>
                    <msisdn>${msisdn}</msisdn>
                    <timeStamp>2021/05/03 16:53:35</timeStamp>
                    <starCode>247</starCode>
                    <keyWord>Omni USSD</keyWord>
                    <dataSet>
                        <param>
                        <id>CIRCLEID</id>
                        <value>3</value>
                        </param>
                        <param>
                        <id>CIRCLE_ID</id>
                        <value>1</value>
                        </param>
                        <param>
                        <id>DIAL-CODE</id>
                        <value>*247#</value>
                        </param>
                        <param>
                        <id>SESSION_ID</id>
                        <value>827727904</value>
                        </param>
                        <param>
                        <id>TRAVERSAL-PATH</id>
                        <value>00</value>
                        </param>
                    </dataSet>
                    <userData>${user_input}</userData>
                </USSDDynMenuRequest>
    `;
    
    return request_body;
    }
}