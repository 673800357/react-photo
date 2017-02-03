/**
 * Created by tan on 2017/2/3.
 */
import React from  'react'
export default class Photo extends React.Component
{
    constructor(props)
    {
        super(props);
        this.change=this.change.bind(this)
    }
    change(e)
    {
        if (this.props.styles.isCenter)
        {
        this.props.inverse();
        }
        else  this.props.center();

        e.preventDefault();
        e.stopPropagation();
    }
    render()
    {
        let styleobj={};
        if (this.props.styles.pos)   styleobj = this.props.styles.pos;
        if (this.props.styles.isCenter)
            styleobj.zIndex=20;
        //console.log("center",styleobj)
        else {
            (['MozTransform', 'msTransform', 'WebkitTransform', 'transform']).forEach((value)=> {
                styleobj[value] = 'rotate(' + this.props.styles.rotate + 'deg)';
            });
        }

        let imgFigureClassName="img-figure";

        imgFigureClassName+=this.props.styles.isInverse? ' is-inverse' : '';
        return (
            <figure className={imgFigureClassName} style={styleobj} onClick={this.change}>

               <div className="img-font">
                   <img src={this.props.data.imgURL}/>
                    <h2 className="img-title">{this.props.data.title}</h2>
               </div>
                    <div className="img-back" onClick={this.change}>
                        <p>
                            {this.props.data.desc}
                        </p>
                    </div>
            </figure>
        )
    }
}
