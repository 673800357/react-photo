/**
 * Created by tan on 2017/2/3.
 */
import React from 'react'
export default class Control extends React.Component
{
    constructor(props)
    {
        super(props);
        this.change=this.change.bind(this)
    }

        change(e)
        {
            if(this.props.styles.isCenter)
            {
                this.props.inverse();
            }
            else this.props.center();
            e.preventDefault();
            e.stopPropagation();

        }



    render()
    {
        let controlClassName="control ";
        if (this.props.styles.isCenter)
           controlClassName += "glyphicon glyphicon-share-alt is-center ";
        if (this.props.styles.isInverse)
            controlClassName += " is-inverse";
        return (
            <span className={controlClassName} onClick={this.change}></span>
        )
    }
}
