import React from "react";
import Tabs from "react-bootstrap/Tabs";
import { Tab } from "react-bootstrap";

export default class Teste2 extends React.Component {
  render() {
    return (
      <Tabs
        defaultActiveKey="home"
        transition={false}
        id="noanim-tab-example"
        className="mb-3">
        <Tab eventKey="home" title="Home">
          
        </Tab>
        <Tab eventKey="profile" title="Profile">
          
        </Tab>

      </Tabs>
    );
  }
}
