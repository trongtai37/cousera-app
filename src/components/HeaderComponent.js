import React, { Component } from 'react'
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Jumbotron } from 'reactstrap'
import { NavLink } from 'react-router-dom'

export class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isNavOpen: false,
		};
	}

	toggleNav() {
		this.setState({
			isNavOpen: !this.state.isNavOpen,
		})
	}

	render() {
		return (
			<div>
				<Navbar  className="navbar-dark" dard expand="md">
					<div className="container">
						<NavbarToggler onClick={() => this.toggleNav()} />
						<NavbarBrand className="mr-auto">
							<NavLink className="nav-link" to="/home">
								<img src="assets/images/logo.png" alt="Ristorante Con Fusion" />
							</NavLink>
						</NavbarBrand>
						<Collapse navbar isOpen={this.state.isNavOpen}>
							<Nav navbar>
								{/* Home Item */}
								<NavItem>
									<NavLink className="nav-link" to="/home">
										<span className="fa fa-home fa-lg"></span>
										Home
									</NavLink>
								</NavItem>
								{/* About Us Item */}
								<NavItem>
									<NavLink className="nav-link" to="/aboutus">
										<span className="fa fa-info fa-lg"></span>
										About Us
									</NavLink>
								</NavItem>
								{/* Menu Item */}
								<NavItem>
									<NavLink className="nav-link" to="/menu">
										<span className="fa fa-list fa-lg"></span>
										Menu
									</NavLink>
								</NavItem>
								{/* Contact Us Item */}
								<NavItem>
									<NavLink className="nav-link" to="/contactus">
										<span className="fa fa-phone fa-lg"></span>
										Contact Us
									</NavLink>
								</NavItem>
							</Nav>
						</Collapse>
					</div>
				</Navbar>
				<Jumbotron>
					<div className="container">
						<div className="row row-header">
							<div className="col-12 col-sm-6">
								<h1>Ristorante Con Fusion</h1>
								<p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
							</div>
						</div>
					</div>
				</Jumbotron>
			</div>
		)
	}
}

export default Header
