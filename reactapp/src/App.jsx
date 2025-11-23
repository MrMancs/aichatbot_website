// TODO - npm i cors react-markdown @radix-ui/themes @radix-ui/react-icons
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Flex, Box, Text, TextField, IconButton, Spinner, ScrollArea, Strong } from "@radix-ui/themes";
import { PaperPlaneIcon, FaceIcon } from "@radix-ui/react-icons";
//import './App.css';
import groqApiKey from './groqkey'; // TODO fill API key

export default class App extends React.Component {
  state = {
    isLoading: false,
    conversation: {
      model: 'llama-3.1-8b-instant',
      messages: [],
    },
    question: '',
  };

  sendQuestion = () => {
    //console.log('sendQuestion state', this.state);
    const question = 'TODO state question';
    //console.log('sendQuestion question', question);

    const requestBodyObj = 'TODO state conversation';
    // TODO append question to messages[]
    // TODO save conversation to state

    const requestBodyJson = JSON.stringify(requestBodyObj);

    // TODO start spinner
    fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer '+groqApiKey
      },
      body: requestBodyJson
    })
    .then(res=>res.json())
    .then(res=>{
      console.log(res);
      // TODO append answer to messages[]

    })
    .catch(console.warn)
    .finally(()=>this.setState({isLoading: false}));
  }

  handleEnter = e => {
    if (e.key == 'Enter') this.sendQuestion(null);
  }

  render() {
    return (
      <Flex direction="column" height="100vh" p="3" gap="3" style={{margin: '10px'}}>
        {/* Header */}
        <Box>
          <Text size="4" weight="bold">
            <Strong>AI Chat</Strong>
          </Text>
        </Box>

        {/* Conversation area */}
        <div 
          style={{
            flex: 1,                    
            overflowY: 'auto', // makes content scrollable
            height: '600px', // if overflows this
            
            border: "1px solid #ccc",
            borderRadius: 8,
            backgroundColor: "#fafafa"
          }}
        >
          <Box p="2" style={{padding: '2px'}}>
            {this.state.conversation.messages.length === 0 ? (
              <Text color="gray">No messages yet…</Text>
            ) : (
              this.state.conversation.messages.map((msg, i) => {
                if (true || i>=this.state.conversation.messages.length-2) {
                // Remove <think>...</think>
                const cleaned = msg.content.replace(/<think>[\s\S]*?<\/think>/, '').trim();
                return (
                  <div key={i}>
                    <h5>TODO - Face icon {msg.role}</h5>
                    TODO - use react markdown for: {cleaned}
                  </div>
                );
              } else return <div key={i}></div>
              })
            )}
          </Box>
        </div>


        {/* Input bar or Spinner */}

        {this.state.isLoading ? <p>&#x23F3; TODO - custom spinner &#x23F3; </p> :

          <Box onKeyDown={this.handleEnter}>
            <p>
              <input type="text" id="inputQuestion" name="inputQuestion" placeholder="Ask…"
              style={{minWidth: '90vw', minHeight: '40px'}}
              onChange={e=>this.setState({question: e.target.value})} />
              <IconButton onClick={this.sendQuestion} id='btnSend' name='btnSend' aria-label='btnSend'>
                TODO - Paper plane icon
              </IconButton>
            </p>
          </Box>

        }


      </Flex>
    );
  }
}