import React, { PureComponent, Component } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
//import styles from './index.less';
import { Card, Row, Col, Modal, Icon, Tooltip } from "antd";
import styles from './index.less';
import TransferModal from "@/components/TransferModal";
import BTC_icon from '../../../node_modules/cryptocurrency-icons/svg/white/btc.svg';
import ETH_icon from '../../../node_modules/cryptocurrency-icons/svg/white/eth.svg';
import TRX_icon from '../../../node_modules/cryptocurrency-icons/svg/white/trx.svg';
import EOS_icon from '../../../node_modules/cryptocurrency-icons/svg/white/eos.svg';
import XRP_icon from '../../../node_modules/cryptocurrency-icons/svg/white/xrp.svg';


class CurrencyIcon extends PureComponent {
    icons = {
        BTC: BTC_icon,
        ETH: ETH_icon,
        TRX: TRX_icon,
        EOS: EOS_icon,
        XRP: XRP_icon,
    }

    render() {
        const { symbol } = this.props;
        if (!symbol || !this.icons[symbol]) {
            return null;
        }

        return (<img src={this.icons[symbol]}></img>);
    }
}

class WalletCard extends Component {

    constructor() {
        super();
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleOnTransferClick = this.handleOnTransferClick.bind(this);
    }

    handleOnClick() {
        console.log("Card click", this.props);
        if (this.props.handleClick) {
            this.props.handleClick(this.props.id);
        }
    }

    handleOnTransferClick() {
        console.log("Transfer click", this.props);
        if (this.props.handleClick) {
            this.props.transferClick(this.props.id);
        }
    }


    handleTransfer() {
        console.log("handleTransfer");
    }

    render() {
        return (
            <Card title={this.props.name} className={`${styles.walletcard}`} onClick={this.handleOnClick}
                size="small"
            >
                <Row>
                    <Col>
                        <span className={styles.balance}>{this.props.balance}</span><span className={styles.currency}>{this.props.currency}</span>
                    </Col>
                </Row>
                <div className={`${styles.walleticons}`}>
                    {this.props.transferClick ? <a onClick={this.handleOnTransferClick}><Tooltip title="Transfer"><Icon type="swap" /></Tooltip></a> : null}
                    {this.props.transferClick ? <a onClick={this.handleOnTransferClick}><Tooltip title="Refresh balance"><Icon type="reload" /></Tooltip></a> : null}
                </div>
                <div className={`${styles.walletcurrencyname}`}>
                    {this.props.currencyname}
                </div>
                <div className={`${styles.walletcurrencysymbol}`}>
                    <CurrencyIcon symbol={this.props.currency} />
                </div>
            </Card>
        );
    }
}


@connect(({ userAssets, userKeys, userWallets, userTransfers }) => ({
    userAssets, userKeys, userWallets, userTransfers
}))
export default class WalletsList extends Component {


    constructor() {
        super()
        this.walletClick = this.walletClick.bind(this);
        this.transferClick = this.transferClick.bind(this);
        this.onCancelTransfer = this.onCancelTransfer.bind(this);
        this.state = {
            transferModalVisible: false,
            trnasferModalKeyId: null
        }
    }

    walletClick(id) {
        console.log("List click", id);
        const { dispatch } = this.props;
        const { keys } = this.props.userKeys;

        dispatch({
            "type": "userWallets/setCurrentKey",
            "payload": keys[id]
        })
    }


    transferClick(id) {
        console.log("Transfer click", id);
        const { dispatch } = this.props;
        const { keys } = this.props.userKeys;

        dispatch({
            "type": "userTransfers/transferForm",
            "payload": id
        })


    }

    renderWalletsList(wallets, walletClickHandler, walletTransferClickHandler) {
        let result = []
        for (let w of wallets) {
            result.push(
                <Col xs={24} sm={12} md={8} lg={6} xl={6} style={{maxWidth:250}} key={"col" + w.id.toString()}>
                    <WalletCard
                        key={w.id}
                        id={w.id}
                        handleClick={walletClickHandler}
                        transferClick={walletTransferClickHandler}
                        currency={w.asset}
                        currencyname={w.assetname}
                        balance={w.balance}
                        name={w.name}
                    />
                </Col>
            )
        }
        return result;
    }

    onCancelTransfer() {
        console.log("onCancelTransfer");
        this.setState({
            transferModalVisible: false
        })
    }

    render() {

        const { keys } = this.props.userKeys;
        const { transferModalVisible, transferModalKeyId } = this.state;
        console.log("WalletList", this.props);
        let wallets = []
        if (keys) {
            wallets = Object.values(keys).filter(k => k.private_key_type != 1)
        }

        return (
            <div>
                <TransferModal visible={this.props.userTransfers.transferForm} />
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    {this.renderWalletsList(wallets, this.walletClick, this.transferClick)}
                </Row>
            </div>
        )

    }

}