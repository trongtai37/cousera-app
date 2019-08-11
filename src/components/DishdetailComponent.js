import React, {Component} from 'react'
import { Card, CardImg, CardBody, CardTitle, CardText, Row, ModalHeader, Label,
	Button, Breadcrumb, BreadcrumbItem, Modal, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom'
import { Control, LocalForm, Errors} from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../redux/baseUrl';

const required = (val) => (val) && (val.length);
const maxLength = (len) => (val) => !val || (val.length <= len);
const minLength = (len) => (val) => !val || (val.length >= len);

class CommentForm extends Component {
	constructor(props) {
		super(props)
	
		this.state = {
			isModalOpen: false,
		}

		this.toggleModal = this.toggleModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	toggleModal(){
		this.setState({
			isModalOpen: !this.state.isModalOpen,
		});
	}

	handleSubmit(values){
		this.toggleModal();
		this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
	}

	render() {
		return (
			<div>
				<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
					<ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
					<ModalBody>
						<div className="col-12 col-md-12">
						<LocalForm onSubmit={(values) => this.handleSubmit(values)}>
							{/* Rating - */}
							<Row className='form-group'>
								<Label htmlFor="rating">Rating</Label>																
								<Control.select model=".rating" name="rating"
									className="form-control" >
									<option>1</option>
									<option>2</option>
									<option>3</option>
									<option>4</option>
									<option>5</option>
								</Control.select>								
							</Row>
							{/* Full Name */}
							<Row className="form-group">
								<Label htmlFor="author">First Name</Label>								
								<Control.text model=".author" id="author" name="author" placeholder="Author"																				
									className='form-control'
									validators={{
										required,
										minLength: minLength(2),
										maxLength: maxLength(15)
									}}
								/>
								<Errors className="text-danger"
									model=".author"
									show="touched"
									messages={{
										required: 'Required ',
										minLength: 'Must be greater than 2 characters ',																						
										maxLength: 'Must be 15 characters or less '
									}}
								/>								
							</Row>
							{/* Comment */}							
							<Row className='form-group'>
								<Label htmlFor="comment">Your Feedback</Label>								
								<Control.textarea model=".comment" id="comment" name="comment" rows="6"
									className="form-control"
								/>								
							</Row>
							<Row className="form-group">
								<Button type="submit" value="submit" color="primary" >Submit</Button>
							</Row>
						</LocalForm>							
						</div>						
					</ModalBody>
				</Modal>
				<Button outline onClick={this.toggleModal}>
					<span className="fa fa-pencil fa-lg"></span> Submit Comment
				</Button>
			</div>
		)
	}
}


function RenderDish({ dish }) {
	return (
		<div className="col-12 col-md-5 m-1">
			<Card>
				<CardImg src={baseUrl + dish.image} alt={dish.name} />
				<CardBody>
					<CardTitle>{dish.name}</CardTitle>
					<CardText>{dish.description}</CardText>
				</CardBody>
			</Card>
		</div>
	)
}

function RenderComment({ comments, addComment, dishId }) {
	if (comments != null) {
		return (
			<div className="col-12 col-md-5 m-1">
				<h4>Comments</h4>
				<ul className="list-unstyled">
					{
						comments.map((comment) => {
							return (
								<li key={comment.id}>
									<p>{comment.comment}</p>
									<p>
										-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}
									</p>
								</li>
							)
						})
					}
				</ul>
				<CommentForm dishId={dishId} addComment={addComment} />
			</div>
		)
	} else {
		return <div></div>
	}
}

const DishDetail = (props) => {
	if (props.isLoading){
		return(
			<div className="comtainer">
				<div className="row">
					<Loading/>
				</div>
			</div>
		);
	}
	else if (props.errMess){
		return(
			<div className="container">
				<div className="row">
					<h4>{props.errMess}</h4>
				</div>
			</div>
		);
	}
	else if (props.dish != null) {
		return (
			<div className="container">
				<div className="row">
					<Breadcrumb>
						<BreadcrumbItem>
							<Link to="/menu">Menu</Link>
						</BreadcrumbItem>
						<BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
					</Breadcrumb>
					<div className="col-12">
						<h3>Menu</h3>
						<hr />
					</div>
				</div>
				<div className="row">
					<RenderDish dish={props.dish} />
					<RenderComment comments={props.comments} addComment={props.addComment} dishId={props.dish.id} />
				</div>
			</div>
		)
	} 
	else {
		return <div></div>
	}

}

export default DishDetail;
