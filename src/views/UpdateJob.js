import React, { Component } from "react";

import {
  Button,
  Container,
  Footer,
  Typography,
  themes,
  Header,
  StickyToast,
  Spinner,
  TextInput,
} from "@mindlab-vojo/component-library";

import "../style/Jobs.sass";

import { getToken } from "../services/Auth";
import { getJob, updateJob } from "../services/Jobs";

class FormJobs extends Component {
  state = {};

  async componentDidMount() {
    const token = await getToken();
    const id = this.getJobId();
    const job = await getJob(id, token);

    await this.setState({
      job: job.data,
    });
  }

  getJobId() {
    return this.props.match.params.id;
  }

  handleFieldUpdate = (fieldName, state) => {
    this.setState({
      job: {
        ...this.state.job,
        [fieldName]: state.value,
      },
    });
  };

  async handleUpdateClick() {
    const updatedJob = {
      _id: this.state.job._id,
      title: this.state.job.title,
      totalSpots: this.state.job.totalSpots,
      description: this.state.job.description,
      education: this.state.job.education,
      location: this.state.job.location,
      requirements: this.state.job.requirements,
      information: this.state.job.information,
      company: this.state.job.company,
      compensation: {
        ...this.state.job.compensation,
        amount: this.state.job.amount,
      },
    };

    this.setState({
      isLoading: true,
    });

    const token = await getToken();
    const response = await updateJob(updatedJob, token);

    this.setState({
      isLoading: false,
    });

    if (response.ok) {
      this.setState({
        message: "Vaga atualizada com sucesso",
      });
    } else {
      const resData = await response.json();
      this.setState({
        message: resData.error.message,
      });
    }
  }

  render() {
    return (
      <Container maxWidth="full">
        <Container maxWidth="full">
          <Header />
          {this.state.message && (
            <div
              style={{
                display: "block",
                width: "100%",
                zIndex: "100",
              }}
            >
              <StickyToast show>
                <Typography
                  color={themes.vojo.colors.primaryColor}
                  tag="span"
                  type="default"
                >
                  {this.state.message}
                </Typography>
              </StickyToast>
            </div>
          )}
        </Container>
        <Container maxWidth="mobile">
          <div className="Jobs__Container">
            <div className="Jobs__Text__Title">
              <Typography
                tag="h1"
                type="title"
                color={themes.vojo.colors.primaryColor}
              >
                <strong>Atualizar vaga</strong>
              </Typography>
            </div>
            {this.state.job && (
              <div className="Jobs__Forms">
                <div className="Jobs__Forms__Input">
                  <TextInput
                    id="title"
                    isRequired
                    label="Título"
                    name="title"
                    placeholder="Título"
                    type="text"
                    value={this.state.job.title}
                    onInputBlur={(state) =>
                      this.handleFieldUpdate("title", state)
                    }
                    onInputChange={(state) =>
                      this.handleFieldUpdate("title", state)
                    }
                  />
                </div>
                <div className="Jobs__Forms__Input">
                  <TextInput
                    id="information"
                    isRequired
                    label="Informações"
                    name="information"
                    placeholder="Informações"
                    type="text"
                    value={this.state.job.information}
                    onInputBlur={(state) =>
                      this.handleFieldUpdate("information", state)
                    }
                    onInputChange={(state) =>
                      this.handleFieldUpdate("information", state)
                    }
                  />
                </div>
                <div className="Jobs__Forms__Input">
                  <TextInput
                    id="education"
                    isRequired
                    label="Escolaridade"
                    name="education"
                    placeholder="Escolaridade"
                    type="text"
                    value={this.state.job.education}
                    onInputBlur={(state) =>
                      this.handleFieldUpdate("education", state)
                    }
                    onInputChange={(state) =>
                      this.handleFieldUpdate("education", state)
                    }
                  />
                </div>
                <div className="Jobs__Forms__Input">
                  <TextInput
                    id="company"
                    isRequired
                    label="Empresa"
                    name="company"
                    placeholder="Empresa"
                    type="text"
                    value={this.state.job.company}
                    onInputBlur={(state) =>
                      this.handleFieldUpdate("company", state)
                    }
                    onInputChange={(state) =>
                      this.handleFieldUpdate("company", state)
                    }
                  />
                </div>
                <div className="Jobs__Forms__Input">
                  <TextInput
                    id="requirements"
                    isRequired
                    label="Requisitos"
                    name="requirements"
                    placeholder="Requisitos"
                    type="text"
                    value={this.state.job.requirements}
                    onInputBlur={(state) =>
                      this.handleFieldUpdate("requirements", state)
                    }
                    onInputChange={(state) =>
                      this.handleFieldUpdate("requirements", state)
                    }
                  />
                </div>
                <div className="Jobs__Forms__Input">
                  <TextInput
                    id="amount"
                    isRequired
                    label="Remuneração"
                    name="amount"
                    placeholder="Remuneração"
                    type="text"
                    value={this.state.job.compensation.amount}
                    onInputBlur={(state) =>
                      this.handleFieldUpdate("amount", state)
                    }
                    onInputChange={(state) =>
                      this.handleFieldUpdate("amount", state)
                    }
                  />
                </div>
                {this.state.isLoading ? (
                  <Spinner />
                ) : (
                  <div className="Jobs__Forms__Button">
                    <div className="Jobs__Forms__Button__Wrapper">
                      <Button
                        id="submit-login"
                        name="submit-login"
                        onButtonClick={() => this.handleUpdateClick()}
                        type="submit"
                      >
                        Salvar
                      </Button>
                    </div>
                    <div className="Jobs__Forms__Button__Wrapper">
                      <Button
                        id="submit-login"
                        name="submit-login"
                        onButtonClick={() =>
                          this.props.history.push({ pathname: "/jobs" })
                        }
                        type="submit"
                      >
                        Voltar
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </Container>
        <Container maxWidth="full">
          <Footer />
        </Container>
      </Container>
    );
  }
}

export default FormJobs;
