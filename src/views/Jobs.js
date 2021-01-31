import React, { Component } from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Container,
  Footer,
  Typography,
  Card,
  themes,
  Header,
} from "@mindlab-vojo/component-library";

import "../style/Jobs.sass";

import { getToken } from "../services/Auth";
import { getJobs } from "../services/Jobs";

class Jobs extends Component {
  state = {
    jobs: [],
  };

  async componentDidMount() {
    const token = getToken();
    const jobs = await getJobs(token);

    await this.setState({
      jobs: jobs.data,
    });
  }

  applyJob() {
    alert("Candidatura efetuada com sucesso");
  }

  render() {
    return (
      <Container maxWidth="full">
        <Container maxWidth="full">
          <Header />
        </Container>
        <Container maxWidth="mobile">
          <div className="Jobs__Container">
            <div>
              <Typography
                tag="h3"
                type="title"
                color={themes.vojo.colors.primaryColor}
              >
                <span>Vagas Disponíveis</span>
              </Typography>
            </div>
            <div className="Jobs__List">
              <strong className="Jobs__Text">Recomendações para você</strong>
              <span className="Jobs__Text__Caption">
                Com base no seu perfil e histórico de pesquisa
              </span>
              {this.state.jobs &&
                this.state.jobs.map((job, index) => (
                  <div className="Jobs__List__Card" key={index}>
                    <Card>
                      <strong className="Jobs__Text__Title__Card">
                        {job.title}
                      </strong>
                      <div className="Jobs__Text__Caption">
                        <span>
                          {job.location.city} ({job.location.state})
                        </span>
                        <span> - </span>
                        <span>{job.totalSpots} vagas</span>
                      </div>
                      <div className="Jobs__List__Card__Content">
                        {job.information && <span>{job.information}</span>}
                      </div>
                      {job.education && (
                        <div className="Jobs__Text__Caption">
                          <span># {job.education}</span>
                        </div>
                      )}
                      {job.requirements && (
                        <div className="Jobs__Text__Caption">
                          <span># {job.requirements}</span>
                        </div>
                      )}

                      {job.compensation && (
                        <div className="Jobs__Text__Caption">
                          <span>
                            # {job.compensation.currency}{" "}
                            {job.compensation.amount}
                          </span>
                        </div>
                      )}
                      <div className="Jobs__Forms__Button">
                        <Button
                          id="apply"
                          name="apply"
                          onButtonClick={() =>
                            alert("Candidatura efetuada com sucesso")
                          }
                          type="submit"
                        >
                          Candidatar
                        </Button>
                      </div>
                      <div className="Jobs__Text__Link">
                        <Link to={"/jobs/" + job._id}>
                          <Typography
                            isUnderlined
                            tag="h1"
                            type="default"
                            color={themes.vojo.colors.primaryColor}
                          >
                            <strong>Editar</strong>
                          </Typography>
                        </Link>
                      </div>
                    </Card>
                  </div>
                ))}
            </div>
          </div>
        </Container>
        <Container maxWidth="full">
          <Footer />
        </Container>
      </Container>
    );
  }
}

export default Jobs;
