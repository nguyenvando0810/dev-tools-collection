import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import FileDisplay from '../components/FileDisplay';
import FileChooser from '../components/FileChooser';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class ResizeTab extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      files: [],
      fileOpen: '',
      fileSave: '',
      width: '',
      height: ''
    };

    this.handleChangeReplaceTo = this.handleChangeReplaceTo.bind(this);
  }

  onClickResize = () => {
    const resize = {
      src: this.state.fileOpen,
      des: this.state.fileSave,
      listName: [],
      width: this.state.width,
      height: this.state.height
    };

    console.log(resize);

  }

  handleChangeDestination = (event) => {
    this.setState({
      width: event.target.value
    });
  }

  handleChangeReplaceTo = (event) => {
    this.setState({ height: event.target.value });
  }

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.files.map((file, index) => index) }));
      return;
    }
    this.setState({ selected: [] });
  }

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;


  receiveFileSave = (fileSave) => {
    this.setState({
      fileSave: fileSave[0],
    });
    console.log(fileSave);
    
  }

  onChosenSource = (fileOpen, files) => {
    this.setState({
      files,
      fileOpen
    });

    console.log(fileOpen);
    console.log(files);
        
  }

  render() {
    const { classes } = this.props;
    const { files, selected, height, width } = this.state;

    return (
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <FileChooser
              onChosenFolder={this.onChosenSource}
            />
            <FileChooser
              onChosenFolder={this.receiveFileSave}
            />
            <Paper >
              <TextField
                id="outlined-with-placeholder"
                label="Width"
                placeholder="100px"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={width}
                onChange={this.handleChangeDestination}
              />
              <TextField
                id="outlined-with-placeholder"
                label="Height"
                placeholder="100px"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={height}
                onChange={this.handleChangeReplaceTo}
              />
            </Paper>
            <Button
              variant="outlined"
              color="secondary"
              style={{ marginTop: 8 }}
              className={classes.button}
              onClick={this.onClickResize}
            >
              RE SIZE
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper}>
            <Table>
              <TableHead >
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={selected.length > 0 && selected.length < files.length}
                      checked={files.length !== 0 && selected.length === files.length}
                      onChange={this.handleSelectAllClick}
                    />
                  </TableCell>
                  <TableCell >Name</TableCell>
                  <TableCell >Demension</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {files.map((file, index) => {
                  const isSelected = this.isSelected(index);

                  return (
                    <FileDisplay
                      key={index}
                      file={file}
                      height={height}
                      width={width}
                      isSelected={isSelected}
                      // clickCheckbox={this.handleClick}
                      selected={this.state.selected}
                      // rename={this.onClickResize}
                    />
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

ResizeTab.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ResizeTab);