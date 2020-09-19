import React, { Component } from "react";
import SideMenu from "./common/sideMenu";
import { Col, Container, Row } from "reactstrap";
import Nav from "./common/nav";
import Wrapper from "./wrapper";
import {
  Grid,
  Segment,
  Button,
  Checkbox,
  Icon,
  Message,
} from "semantic-ui-react";
import AfterNav from "./common/afterNav";
import {
  MISSING_USER_MSG,
  ERROR_MSG,
  MEAL_CREATE,
  toastOptions,
} from "../utility/global";
import clientService from "../services/clientService";
import { Link } from "react-router-dom";
import { fetchUser } from "../actions/productActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { toast } from "react-toastify";
import "date-fns";
import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
const minTime = new Date("2014-08-18T21:11:54").setHours(10, 0, 0);
const maxTime = new Date("2014-08-18T21:11:54").setHours(20, 0, 0);
class AvailableTime extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shopId: "",
      loading: false,
      disabled: false,
      sunChecked: false,
      monChecked: false,
      tueChecked: false,
      wedChecked: false,
      thurChecked: false,
      friChecked: false,
      satChecked: false,

      selectedSunMax: maxTime,
      selectedSunMin: minTime,
      selectedMonMin: minTime,
      selectedMonMax: maxTime,
      selectedTueMax: maxTime,
      selectedTueMin: minTime,
      selectedWedMin: minTime,
      selectedWedMax: maxTime,
      selectedThurMax: maxTime,
      selectedThurMin: minTime,
      selectedFriMin: minTime,
      selectedFriMax: maxTime,
      selectedSatMin: minTime,
      selectedSatMax: maxTime,

      sunId: "",
      monId: "",
      tueId: "",
      wedId: "",
      thurId: "",
      friId: "",
      satId: "",
    };
  }

  componentDidMount = async () => {};

  componentWillReceiveProps = async (nextProps) => {
    if (nextProps) {
      const shopId = nextProps.user.shopId;

      this.setState({
        shopId,
      });

      const getShopOpeningDays = await clientService.findOpeningDaysByShop({
        shopId,
      });

      const result = getShopOpeningDays.data.data;
      let sunday;
      let monday;
      let tuesday;
      let wednesday;
      let thursday;
      let friday;
      let saturday;
      if (result.length > 0) {
        const arr = result[0];
        sunday = arr.Sunday;
        monday = arr.Monday;
        tuesday = arr.Tuesday;
        wednesday = arr.Wednesday;
        thursday = arr.Thursday;
        friday = arr.Friday;
        saturday = arr.Saturday;
      }

      if (sunday) {
        const sunMinDate = sunday.opening;
        const sunMaxDate = sunday.closing;

        this.setState({
          sunId: sunday.id,
          selectedSunMin: sunMinDate,
          selectedSunMax: sunMaxDate,
          sunChecked: sunday.checked,
        });
      }

      if (monday) {
        this.setState({
          monId: monday.id,
          selectedMonMin: monday.opening,
          selectedMonMax: monday.closing,
          monChecked: monday.checked,
        });
      }

      if (tuesday) {
        this.setState({
          tueId: tuesday.id,
          selectedTueMin: tuesday.opening,
          selectedTueMax: tuesday.closing,
          tueChecked: tuesday.checked,
        });
      }

      if (wednesday) {
        this.setState({
          wedId: wednesday.id,
          selectedWedMin: wednesday.opening,
          selectedWedMax: wednesday.closing,
          wedChecked: wednesday.checked,
        });
      }
      if (thursday) {
        this.setState({
          thurId: thursday.id,
          selectedThurMin: thursday.opening,
          selectedThurMax: thursday.closing,
          thurChecked: thursday.checked,
        });
      }
      if (friday) {
        this.setState({
          friId: friday.id,
          selectedFriMin: friday.opening,
          selectedFriMax: friday.closing,
          friChecked: friday.checked,
        });
      }
      if (saturday) {
        this.setState({
          satId: saturday.id,
          selectedSatMin: saturday.opening,
          selectedSatMax: saturday.closing,
          satChecked: saturday.checked,
        });
      }
    }
  };

  handleSunMax = (date) => {
    this.setState({
      selectedSunMax: date._d,
    });
  };

  handleSunMin = (date) => {
    console.log(date._d);
    this.setState({
      selectedSunMin: date._d,
    });
  };
  handleMonMin = (date) => {
    this.setState({
      selectedMonMin: date._d,
    });
  };
  handleMonMax = (date) => {
    this.setState({
      selectedMonMax: date._d,
    });
  };

  handleTueMin = (date) => {
    this.setState({
      selectedTueMin: date._d,
    });
  };
  handleTueMax = (date) => {
    this.setState({
      selectedTueMax: date._d,
    });
  };

  handleWedMin = (date) => {
    this.setState({
      selectedWedMin: date._d,
    });
  };
  handleWedMax = (date) => {
    this.setState({
      selectedWedMax: date._d,
    });
  };

  handleThurMin = (date) => {
    this.setState({
      selectedThurMin: date._d,
    });
  };
  handleThurMax = (date) => {
    this.setState({
      selectedThurMax: date._d,
    });
  };
  handleFriMin = (date) => {
    this.setState({
      selectedFriMin: date._d,
    });
  };
  handleFriMax = (date) => {
    this.setState({
      selectedFriMax: date._d,
    });
  };

  handleSatMin = (date) => {
    this.setState({
      selectedSatMin: date._d,
    });
  };
  handleSatMax = (date) => {
    this.setState({
      selectedSatMax: date._d,
    });
  };
  onChangeCheck = (e, data) => {
    this.setState({
      [data.name]: data.checked,
    });
  };
  onSubmit = async (e) => {
    e.preventDefault();
    try {
      const {
        shopId,
        selectedSunMin,
        selectedSunMax,
        selectedMonMin,
        selectedMonMax,
        selectedTueMin,
        selectedTueMax,
        selectedWedMin,
        selectedWedMax,
        selectedThurMin,
        selectedThurMax,
        selectedFriMin,
        selectedFriMax,
        selectedSatMin,
        selectedSatMax,
        sunChecked,
        monChecked,
        tueChecked,
        wedChecked,
        thurChecked,
        friChecked,
        satChecked,

        sunId,
        monId,
        tueId,
        wedId,
        thurId,
        friId,
        satId,
      } = this.state;

      this.setState({
        loading: true,
        disabled: true,
      });

      const result = await clientService.createOpeningDay({
        shopId,
        sunChecked,
        monChecked,
        tueChecked,
        wedChecked,
        thurChecked,
        friChecked,
        satChecked,

        selectedSunMin,
        selectedSunMax,
        selectedMonMin,
        selectedMonMax,
        selectedTueMin,
        selectedTueMax,
        selectedWedMin,
        selectedWedMax,
        selectedThurMin,
        selectedThurMax,
        selectedFriMin,
        selectedFriMax,
        selectedSatMin,
        selectedSatMax,

        sunId,
        monId,
        tueId,
        wedId,
        thurId,
        friId,
        satId,
      });
      if (result.data.error) {
        toast.success(result.data.message, toastOptions(true));
      } else {
        toast.success(result.data.message, toastOptions());
      }
    } catch (err) {
      toast.success("No network", toastOptions(true));
    } finally {
      this.setState({
        loading: false,
        disabled: false,
      });
    }
  };
  render() {
    const {
      sunChecked,
      monChecked,
      tueChecked,
      wedChecked,
      thurChecked,
      friChecked,
      satChecked,

      selectedSunMin,
      selectedSunMax,
      selectedMonMin,
      selectedMonMax,
      selectedTueMin,
      selectedTueMax,
      selectedWedMin,
      selectedWedMax,
      selectedThurMin,
      selectedThurMax,
      selectedFriMin,
      selectedFriMax,
      selectedSatMin,
      selectedSatMax,
      disabled,
      loading,
    } = this.state;

    return (
      <Container fluid={true}>
        <Wrapper>
          <Message attached header="Opening time" />
          <Segment raised>
            <Grid padded columns="equal">
              <Grid.Row>
                <Grid.Column>
                  <h4>Sunday</h4>
                </Grid.Column>
                <Grid.Column>
                  <Checkbox
                    onChange={this.onChangeCheck}
                    checked={sunChecked}
                    name="sunChecked"
                    toggle
                  />
                </Grid.Column>
                <Grid.Column>
                  {sunChecked ? (
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <KeyboardTimePicker
                        id="time-picker"
                        name="sunMin"
                        value={selectedSunMin}
                        onChange={this.handleSunMin}
                        KeyboardButtonProps={{
                          "aria-label": "change time",
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  ) : (
                    ""
                  )}
                </Grid.Column>
                <Grid.Column>
                  {sunChecked ? (
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <KeyboardTimePicker
                        id="time-picker"
                        name="sunMax"
                        value={selectedSunMax}
                        onChange={this.handleSunMax}
                        KeyboardButtonProps={{
                          "aria-label": "change time",
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  ) : (
                    ""
                  )}
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Grid padded columns="equal">
              <Grid.Row>
                <Grid.Column>
                  <h4>Monday</h4>
                </Grid.Column>
                <Grid.Column>
                  <Checkbox
                    onChange={this.onChangeCheck}
                    checked={monChecked}
                    name="monChecked"
                    toggle
                  />
                </Grid.Column>
                <Grid.Column>
                  {monChecked ? (
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <KeyboardTimePicker
                        id="time-picker"
                        name="monMin"
                        value={selectedMonMin}
                        onChange={this.handleMonMin}
                        KeyboardButtonProps={{
                          "aria-label": "change time",
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  ) : (
                    ""
                  )}
                </Grid.Column>
                <Grid.Column>
                  {monChecked ? (
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <KeyboardTimePicker
                        id="time-picker"
                        name="monMax"
                        value={selectedMonMax}
                        onChange={this.handleMonMax}
                        KeyboardButtonProps={{
                          "aria-label": "change time",
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  ) : (
                    ""
                  )}
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Grid padded columns="equal">
              <Grid.Row>
                <Grid.Column>
                  <h4>Tuesday</h4>
                </Grid.Column>
                <Grid.Column>
                  <Checkbox
                    onChange={this.onChangeCheck}
                    checked={tueChecked}
                    name="tueChecked"
                    toggle
                  />
                </Grid.Column>
                <Grid.Column>
                  {tueChecked ? (
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <KeyboardTimePicker
                        id="time-picker"
                        name="tueMin"
                        value={selectedTueMin}
                        onChange={this.handleTueMin}
                        KeyboardButtonProps={{
                          "aria-label": "change time",
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  ) : (
                    ""
                  )}
                </Grid.Column>
                <Grid.Column>
                  {tueChecked ? (
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <KeyboardTimePicker
                        id="time-picker"
                        name="tueMax"
                        value={selectedTueMax}
                        onChange={this.handleTueMax}
                        KeyboardButtonProps={{
                          "aria-label": "change time",
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  ) : (
                    ""
                  )}
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Grid padded columns="equal">
              <Grid.Row>
                <Grid.Column>
                  <h4>Wednesday</h4>
                </Grid.Column>
                <Grid.Column>
                  <Checkbox
                    onChange={this.onChangeCheck}
                    checked={wedChecked}
                    name="wedChecked"
                    toggle
                  />
                </Grid.Column>
                <Grid.Column>
                  {wedChecked ? (
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <KeyboardTimePicker
                        id="time-picker"
                        name="wedMin"
                        value={selectedWedMin}
                        onChange={this.handleWedMin}
                        KeyboardButtonProps={{
                          "aria-label": "change time",
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  ) : (
                    ""
                  )}
                </Grid.Column>
                <Grid.Column>
                  {wedChecked ? (
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <KeyboardTimePicker
                        id="time-picker"
                        name="wedMax"
                        value={selectedWedMax}
                        onChange={this.handleWedMax}
                        KeyboardButtonProps={{
                          "aria-label": "change time",
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  ) : (
                    ""
                  )}
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Grid padded columns="equal">
              <Grid.Row>
                <Grid.Column>
                  <h4>Thursday</h4>
                </Grid.Column>
                <Grid.Column>
                  <Checkbox
                    onChange={this.onChangeCheck}
                    checked={thurChecked}
                    name="thurChecked"
                    toggle
                  />
                </Grid.Column>
                <Grid.Column>
                  {thurChecked ? (
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <KeyboardTimePicker
                        id="time-picker"
                        name="thurMin"
                        value={selectedThurMin}
                        onChange={this.handleThurMin}
                        KeyboardButtonProps={{
                          "aria-label": "change time",
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  ) : (
                    ""
                  )}
                </Grid.Column>
                <Grid.Column>
                  {thurChecked ? (
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <KeyboardTimePicker
                        id="time-picker"
                        name="thurMax"
                        value={selectedThurMax}
                        onChange={this.handleThurMax}
                        KeyboardButtonProps={{
                          "aria-label": "change time",
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  ) : (
                    ""
                  )}
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Grid padded columns="equal">
              <Grid.Row>
                <Grid.Column>
                  <h4>Friday</h4>
                </Grid.Column>
                <Grid.Column>
                  <Checkbox
                    onChange={this.onChangeCheck}
                    checked={friChecked}
                    name="friChecked"
                    toggle
                  />
                </Grid.Column>
                <Grid.Column>
                  {friChecked ? (
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <KeyboardTimePicker
                        id="time-picker"
                        name="friMin"
                        value={selectedFriMin}
                        onChange={this.handleFriMin}
                        KeyboardButtonProps={{
                          "aria-label": "change time",
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  ) : (
                    ""
                  )}
                </Grid.Column>
                <Grid.Column>
                  {friChecked ? (
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <KeyboardTimePicker
                        id="time-picker"
                        name="friMax"
                        value={selectedFriMax}
                        onChange={this.handleFriMax}
                        KeyboardButtonProps={{
                          "aria-label": "change time",
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  ) : (
                    ""
                  )}
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Grid padded columns="equal">
              <Grid.Row>
                <Grid.Column>
                  <h4>Saturday</h4>
                </Grid.Column>
                <Grid.Column>
                  <Checkbox
                    onChange={this.onChangeCheck}
                    checked={satChecked}
                    name="satChecked"
                    toggle
                  />
                </Grid.Column>
                <Grid.Column>
                  {satChecked ? (
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <KeyboardTimePicker
                        id="time-picker"
                        name="satMin"
                        value={selectedSatMin}
                        onChange={this.handleSatMin}
                        KeyboardButtonProps={{
                          "aria-label": "change time",
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  ) : (
                    ""
                  )}
                </Grid.Column>
                <Grid.Column>
                  {satChecked ? (
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <KeyboardTimePicker
                        id="time-picker"
                        name="satMax"
                        value={selectedSatMax}
                        onChange={this.handleSatMax}
                        KeyboardButtonProps={{
                          "aria-label": "change time",
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  ) : (
                    ""
                  )}
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <hr></hr>
            <Button
              loading={loading}
              disabled={disabled}
              padding
              color="red"
              onClick={this.onSubmit}
              type="button"
            >
              Save <Icon name="save" />
            </Button>
          </Segment>
          <br />
          <br />
        </Wrapper>
      </Container>
    );
  }
}
AvailableTime.propTypes = {
  fetchUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.products.user,
});

export default connect(mapStateToProps, { fetchUser })(AvailableTime);
