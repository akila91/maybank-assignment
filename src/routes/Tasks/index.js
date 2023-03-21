import React, { Component, useState } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Row, Col, PageHeader, AutoComplete, Table } from "antd"

import * as todoActions from '../../store/todos/actions'
import * as todoSelectors from '../../store/todos/selectors'
import { withRouter } from "react-router-dom";

class Tasks extends Component {

	constructor(props) {
		super(props);
		this.state = {
			reqParams: {
				userId: 1
			},
			options: ''
		};

		this.columns = [{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
		}, {
			title: 'Title',
			dataIndex: 'title',
			key: 'title',
		}
		]
	}


	componentDidMount() {
		const { reqParams } = this.state;
		this.state = {
			dataSource: []
		};
		this.props.todoActions.todosRequest(reqParams);
	}

	handleSearch = (value) => {
		this.setState({
			dataSource: !value ? [] : [value,
				value + value,
				value + value + value,],
		});
	}

	render() {
		const { allTodos } = this.props;
		const { dataSource } = this.state;
		return (
			<React.Fragment>
				<PageHeader
					style={{ margin: '16px 0' }}
					title="Tasks"
				/>
				<div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
					<AutoComplete
						dataSource={dataSource}
						style={{ width: 200 }}
						onSearch={this.handleSearch}
						placeholder="input here"
					/>
					<Row>
						<Col span={24}>

							<h3 style={{ marginBottom: 20 }}>Tasks List</h3>

							<Table dataSource={allTodos.data} loading={allTodos.tracker.status === "processing"}
								columns={this.columns} size="small" />

						</Col>
					</Row>
				</div>
			</React.Fragment>

		);
	}
}


const mockVal = (str, repeat = 1) => ({
	value: str.repeat(repeat),
});

const mapStateToProps = state => {
	return {
		allTodos: todoSelectors.getTodos(state),
	}
};

const mapDispatchToProps = dispatch => {
	return {
		todoActions: bindActionCreators(todoActions, dispatch),
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Tasks));
