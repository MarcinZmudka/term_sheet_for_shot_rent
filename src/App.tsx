import React from 'react';
import './App.css';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import QueryComponent from './Components/Query';
const client = new ApolloClient({
  uri: 'https://api-euwest.graphcms.com/v1/ck6q76l4y5jdv01fm7b7f9exl/master',
});
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ApolloProvider client={client}>
          <QueryComponent/>
        </ApolloProvider>
      </header>
    </div>
  );
}

export default App;
