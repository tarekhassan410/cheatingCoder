import React, { Component } from "react";
import "./bulma_theme.css";
import axios from "axios";
import "./index.css";
import {CopyToClipboard} from 'react-copy-to-clipboard';

class App extends Component {
  state = {
    shortcuts: [],
    source: "gitCommands",
    value: null,
  };

  constructor() {
    super();
    this.filterList = this.filterList.bind(this);
    this.capitalize = this.capitalize.bind(this);
    this.setDataToGit = this.setDataToGit.bind(this);
    this.setDataToVS = this.setDataToVS.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    axios.get(`./` + this.state.source + `.json`).then(response => {
      this.setState({
        shortcuts: response.data.commandsData
      });
    });
  }

  capitalize(text) {
    text = text
      .toLowerCase()
      .split(" ")
      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ");
    return text;
  }

  filterList(e) {
    this.setState({
      value: e.target.value.toLowerCase()
    });
  }

  setDataToGit() {
    this.setState(
      {
        source: "gitCommands"
      },
      this.getData
    );
  }

  setDataToVS() {
    this.setState(
      {
        source: "data"
      },
      this.getData
    );
  }

  render() {
    const list =
      this.state.value == null || ""
        ? this.state.shortcuts
        : this.state.shortcuts.filter(
            shortcut =>
              shortcut.command.toLowerCase().includes(this.state.value) &&
              shortcut.command
          );

    return (
      <div>
        <div className="hero section is-small is-primary is-bold">
          <div className="container has-text-centered">
            <div className="title has-text-dark is-size-1">
              Cheating coder
            </div>
            <div className="subtitle has-text-dark is-size-5">
              Search and learn Git commands and VS Code shortcuts <br />
              <span className="subtitle has-text-grey-dark is-size-7 has-text-centered">
                {" "}
                Made with <i className="fas fa-heart" /> by{" "}
                <a
                  href="https://twitter.com/tarekhassan"
                  rel="noopener noreferrer"
                  className="has-text-link"
                  target="_blank"
                >
                  {" "}
                  @tarekhassan{" "}
                </a>
                <div className="is-grouped has-text-centered">
                  <a
                    className="button github-button"
                    href="https://github.com/tarekhassan410/FasterVSCoder"
                    aria-label="Star tarekhassan410/FasterVSCoder on GitHub"
                  >
                    Star
                  </a>
                  <a
                    className="button github-button"
                    href="https://github.com/tarekhassan410/FasterVSCoder/fork"
                    aria-label="Fork tarekhassan410/FasterVSCoder on GitHub"
                  >
                    Fork
                  </a>
                </div>
              </span>
            </div>

            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  onChange={this.filterList}
                  className="input is-primary is-medium is-rounded"
                  type="email"
                  placeholder="Search commands 'Cut', 'Copy', 'Delete, 'Toggle' etc "
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-search" />
                </span>
              </p>
              <div className="buttonsStyle is-grouped has-text-centered">
                {this.state.source === "data" ? (
                  <button
                    onClick={this.setDataToGit}
                    className="button is-link is-medium is-outlined"
                  >
                    Git commands
                  </button>
                ) : (
                  <button
                    onClick={this.setDataToGit}
                    className="button is-link is-medium is-active"
                  >
                    Git commands
                  </button>
                )}
                {this.state.source === 'data'? 
              <button
              onClick={this.setDataToVS}
              className="button is-link is-active is-medium"
            >
              VS Code shortcuts
            </button>
            :
            <button
                  onClick={this.setDataToVS}
                  className="button is-link is-outlined is-medium"
                >
                  VS Code shortcuts
                </button>  
              }
                
              </div>
            </div>
          </div>
        </div>

        <div className="section">
          <div
            className="container has-text-centered"
            style={{ overflowX: "auto" }}
          >
            <table className="table is-fullwidth is-striped is-hoverable">
              <thead>
                <tr>
                  <th className="is-size-4 command">Command</th>
                  <th className="is-size-4 key">Key</th>
                </tr>
              </thead>
              <tbody>
                {list.map((s, i) => (
                  <tr key={i}>
                    <td class="command">{s.command}</td>
                    <td class="key">{s.key}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
