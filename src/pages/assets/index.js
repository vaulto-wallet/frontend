import React, {Component} from 'react';
import { connect } from 'dva';
import {Button, Layout, Card, Modal, Input, InputNumber, Form, Table} from 'antd'; 
const {
  Header, Content, Footer, Sider,
} = Layout;

@connect(({ userAssets }) => ({
  userAssets
}))
class CreateAssetForm extends Component{
  handleSubmit = e =>{
    e.preventDefault();
    const { dispatch } = this.props;
    this.props.form.validateFields( (err, values) => {
      if(!err){
        console.log('Received values', values);
        
        dispatch({
          type: 'userAssets/createAsset',
          payload: values,
        });
      }
    });
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        <Form.Item label="Symbol">
          {getFieldDecorator('symbol', {
              rules: [{ required: true, message: 'Symbol is required!' }],
           })(<Input/>)}
        </Form.Item>
        <Form.Item label="Name">
          {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Name field is required!' }],
           })(<Input/>)}
        </Form.Item>
        <Form.Item label="Decimals">
          {getFieldDecorator('decimals', {
              rules: [{ required: true, message: 'Decimals field is required!' }],
           })(<InputNumber/>)}
        </Form.Item>
        <Form.Item label="Rounding">
          {getFieldDecorator('rounding', {
              rules: [{ required: true, message: 'Rounding field is required!' }],
           })(<InputNumber/>)}
        </Form.Item>
        <Form.Item label="Coin index">
          {getFieldDecorator('coin_index', {
              rules: [{ required: true, message: 'Coin index field is required!' }],
           })(<InputNumber/>)}
        </Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
                Create
        </Button>
      </Form>
    );
  
  }
};

const CreatedAssetForm = Form.create({"name" : 'create_asset_form'})(CreateAssetForm);

@connect(({ userAssets }) => ({
  userAssets
}))
class AssetPage extends Component{
  state = {
      createAssetModalVisible : false,
  }

  componentWillMount(){
    const { dispatch } = this.props;
    dispatch({
      type: 'userAssets/getAssets',
      payload: {},
    });

  }

  render(){
    const {userAssets} = this.props; 
    const {assets} = userAssets;

    const columns = [
      {
        title : 'Symbol',
        dataIndex: 'symbol',
        key: 'symbol'
      },
      {
        title : 'Name',
        dataIndex: 'name',
        key: 'name'
      },
    ]

    const dataSource = assets ? Object.values(assets) : null;

    console.log('AssetPage render',this.props, dataSource);

    return(
      <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
        <Modal
          title="Create asset" 
          visible={this.state.createAssetModalVisible}
          onCancel = {()=>{this.setState({createAssetModalVisible:false})}}
        >
            <CreatedAssetForm/>
        </Modal>
         <Card>
          <Button onClick={()=>{this.setState({createAssetModalVisible:true}) }}>Create asset</Button>
        </Card> 

        <Card>
          {dataSource ? <Table dataSource={dataSource} columns={columns} rowKey="symbol" /> : null}
        </Card>

      </Content> 
  )}
}

export default AssetPage;