/**
 * Created by hayzroyanghuanzhou on 2018/12/6.
 */
import React from 'react';
import {Link} from 'react-router-dom';

class LinkWrapper extends React.Component {


    render() {
        const Component = this.props.to ? Link : 'a';
        return (
            <Component {...props}>
                { this.props.children }
            </Component>
        )
    }

}

export default LinkWrapper;