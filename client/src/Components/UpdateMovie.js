import React from "react";
import axios from "axios";

class UpdateMovie extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      updateMovie: {
        id: Date.now(),
        title: "",
        director: "",
        metascore: 0,
        stars: []
      }
    };
  }
  componentDidMount() {
    console.log('state',this.props);
    const id = this.props.match.params.id;
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => 
        this.setState({ updateMovie: res.data }))
      .catch(err => console.log(err.response));
    // const movie = this.props.movies.find(mov => `${mov.id}` === id);
    // if (movie) this.setState(movie);
  }

  handleSubmit = e => {
    e.preventDefault();
    const id = this.props.match.params.id;
    axios
      .put(`http://localhost:5000/api/movies/${id}`, this.state.updateMovie)
      .then(res => {
        console.log(res);
        //this.setState(res.data);
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange = e => {
    //e.persist();
    this.setState({
      
      updateMovie:{ ...this.state.updateMovie,[e.target.name]: e.target.value}
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Movie Title"
            value={this.state.updateMovie.title}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="director"
            placeholder="Director"
            value={this.state.updateMovie.director}
            onChange={this.handleChange}
          />
          <input
            type="number"
            name="metascore"
            placeholder="Metascore"
            value={this.state.updateMovie.metascore}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="stars"
            placeholder="Stars"
            value={this.state.updateMovie.stars}
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
export default UpdateMovie;
