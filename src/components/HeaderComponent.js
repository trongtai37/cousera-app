import React, { Component } from 'react'
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
	Button, Modal, ModalHeader, ModalBody,
	Form, FormGroup, Input, Label } from 'reactstrap';
import { NavLink } from 'react-router-dom'
import { baseUrl } from '../redux/baseUrl';

export class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isNavOpen: false,
			isModalOpen: false,
		};

		this.toggleNav = this.toggleNav.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
	}

	toggleNav() {
		this.setState({
			isNavOpen: !this.state.isNavOpen,
		})
	}

	toggleModal() {
		this.setState({
			isModalOpen: !this.state.isModalOpen,
		})
	}

	handleLogin(event){
		this.toggleModal();
		alert("Username: " + this.username.value + "Password: " + this.password.value + "Remember me: "+ this.remember.checked);
		event.preventDefault();
	}

	render() {
		return (
			<div>
				{/* Modal Login Form */}
				<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
					<ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
					<ModalBody>
						<Form onSubmit={this.handleLogin}>
							<FormGroup>
								<Label htmlFor="username">Username</Label>
								<Input type="text" id="username" name="username" innerRef={(input) => this.username = input}/>
							</FormGroup>
							<FormGroup>
								<Label htmlFor="password">Password</Label>
								<Input type="text" id="password" name="password" innerRef={(input) => this.password = input}/>
							</FormGroup>
							<FormGroup check>
								<Label check htmlFor="remember">
								<Input type="checkbox" name="remember" innerRef={(input) => this.remember = input}/>									
									Remember me!
								</Label>
							</FormGroup>
							<Button type="submit" value="submit" color="primary" >Login</Button>
						</Form>
					</ModalBody>
				</Modal>
				{/* Header of Website */}
				<Navbar  className="navbar-dark" dard expand="md">
					<div className="container">
						<NavbarToggler onClick={this.toggleNav} />
						<NavbarBrand className="mr-auto">
							<NavLink className='nav-link' to="/home">
								<img style={{width: '80px', height: '80px'}} src={baseUrl + 'images/restaurant.png'} alt="The Line Restaurant" />						
							</NavLink>
						</NavbarBrand>
						<Collapse navbar isOpen={this.state.isNavOpen}>
							<Nav navbar>
								{/* Home Item */}
								<NavItem>
									<NavLink className="nav-link" to="/home">
										<span className="fa fa-home fa-lg"></span>
										{' '}Home
									</NavLink>
								</NavItem>
								{/* Menu Item */}
								<NavItem>
									<NavLink className="nav-link" to="/menu">
										<span className="fa fa-list fa-lg"></span>
										{' '} Menu
									</NavLink>
								</NavItem>
								{/* About Us Item */}
								<NavItem>
									<NavLink className="nav-link" to="/aboutus">
										<span className="fa fa-info fa-lg"></span>
										{' '} About Us
									</NavLink>
								</NavItem>								
								{/* Contact Us Item */}
								<NavItem>
									<NavLink className="nav-link" to="/contactus">
										<span className="fa fa-phone fa-lg"></span>
										{' '}Contact Us
									</NavLink>
								</NavItem>
							</Nav>
						</Collapse>
					</div>

					<Nav className="ml-auto" navbar>
						<NavItem>
							<Button outline color="secondary" onClick={this.toggleModal}>
								<span className="fa fa-sign-in fa-lg"></span>
								<strong>{' '}Login</strong>
							</Button>
						</NavItem>
					</Nav>
				</Navbar>

				<Jumbotron>
					<div className="container">
						<div className="row row-header">
							<div className="col-sm-6">
								<h1>The Line Restaurant</h1>
								<p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
							</div>																					
						</div>
						<div className="row row-header">
							<p className="lead col-sm">
								<Button color="primary">Learn More >></Button>
							</p>
						</div>
					</div>
				</Jumbotron>
			</div>
		)
	}
}

export default Header
