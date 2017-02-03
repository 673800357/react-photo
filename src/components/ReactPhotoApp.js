
import React from 'react'
// CSS
import  'normalize.css';
import '../styles/main.scss';
import data from '../data/data.json'
//从json中读取图片的路径
let datas=(function (getData) {
    getData.forEach((item)=>{
        item.imgURL=`../images/${item.fileName}`
    });
    return getData;
})(data);
//取给定范围内的一个随机数字
function getRange(low,high) {
    return Math.ceil(Math.random()*(high-low)+low);
}
//获取一个随机的角度
function getDeg() {
    return ((Math.random()>0.5? '':'-')+ Math.ceil(Math.random()*40))
}
class Photo extends React.Component
{
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


        return (
            <figure className="img-figure" style={styleobj}>
                <img src={this.props.data.imgURL}/>
                <p className="img-figure-caption">{this.props.data.title}</p>
            </figure>
        )
    }
}

class ReactPhotoApp extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={imgsArrangeArr:[

        ]} ;
        this.rearrange=this.rearrange.bind(this);
        /*{
     pos: {
     left: '0',
     top: '0'
     },
     rotate: 0,    // 旋转角度
     isInverse: false,    // 图片正反面
     isCenter: false,    // 图片是否居中
     }*/
        this.Constant={
            centerPos: { //居中的的定位
                left: 0,
                top: 0
            },
            hPosRange: {   // 水平方向的取值范围
                leftSecX: [0, 0],//左侧的x取值范围
                rightSecX: [0, 0],//右侧的x取值范围
                y: [0, 0]//左右测的y取值范围
            },
            vPosRange: {    // 垂直方向的取值范围
                x: [0, 0],     //上侧图片的x取值范围
                topY: [0, 0]   //上测图片的y取值范围
            }
        };
    }
    componentDidMount()//计算范围
    {
     const stageDOM=React.findDOMNode(this.refs.stage),//取得stage的DOM
            stageW=stageDOM.scrollWidth,stageH=stageDOM.scrollHeight,
         img=React.findDOMNode(this.refs.img0),//图片
         imgH=img.scrollHeight,imgW=img.scrollWidth;

        //居中的定位fanwei
        /*this.Constant.centerPos={
            left:(stageW-imgW)/2,
            top:(stageH-imgH)/2
        };*/
        this.Constant.centerPos.left=(stageW-imgW)/2;
        this.Constant.centerPos.top=(stageH-imgH)/2;
        //上方
        this.Constant.vPosRange.x[0]=stageW/2-imgW;
        this.Constant.vPosRange.x[1]=stageW/2;
        this.Constant.vPosRange.topY[0]=0-imgH/2;
        this.Constant.vPosRange.topY[1]=stageH/2-imgH/2*3;

        //z左右
        this.Constant.hPosRange.leftSecX[0] = imgW/2;
        this.Constant.hPosRange.leftSecX[1] = stageW/2 - imgW/2 * 3;
        this.Constant.hPosRange.rightSecX[0] = stageW/2 + imgW/2;
        this.Constant.hPosRange.rightSecX[1] = stageW - imgH/2;
        this.Constant.hPosRange.y[0] = -imgH/2;
        this.Constant.hPosRange.y[1] = stageH - imgH/2;

        this.rearrange(0)
    }

    //

    //重新布局
    rearrange(centerIndex)
    {
     let imgsArrangeArr = this.state.imgsArrangeArr,//存剩余的图片
         Constant = this.Constant,
         centerPos = Constant.centerPos,//居中定位
         hPosRange = Constant.hPosRange,//水平定位
         vPosRange = Constant.vPosRange,//垂直定位

         hPosRangeLeftSecX = hPosRange.leftSecX,//左边x
         hPosRangeRightSecX = hPosRange.rightSecX,//右边x
         hPosRangeY = hPosRange.y,//左右y

         vPosRangeTopY = vPosRange.topY,//上侧的y
         vPosRangeX = vPosRange.x, //上侧的的x
         imgsArrangeTopArr = [],//放上方的图片
         topImgNum = Math.floor(Math.random() * 2),    // 取一个或者0个,上方图片
         topImgSpliceIndex = 0,
        //取出居中的图片
        imgsArrangeCenterArr=imgsArrangeArr.splice(centerIndex,1);
        console.log(centerPos);
            //将图片居中
        imgsArrangeCenterArr[0]={
         pos:centerPos,
            isCenter:true,
            rotate:0
        };

        //上方的图片
        topImgSpliceIndex=Math.ceil(Math.random() * (imgsArrangeArr.length-topImgNum));//取出上方图片的起始下标
        //console.log("imglength",topImgSpliceIndex)
        imgsArrangeTopArr=imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);//取出了上方的图片

        imgsArrangeTopArr.forEach((item,index)=>{
            imgsArrangeTopArr[index]={
                pos:{
                    top:getRange(vPosRangeTopY[0],vPosRangeTopY[1]),
                    left:getRange(vPosRangeX[0],vPosRangeX[1])
                },
                isCenter:false,
                rotate:getDeg()
            }
        });

        //左右的图片
        imgsArrangeArr.forEach((item,index)=>{
            let rangex;
            if (index<imgsArrangeArr.length/2) rangex= hPosRangeLeftSecX;
            else rangex=hPosRangeRightSecX;
            //为什么用item={}不行？
            imgsArrangeArr[index]={
                pos:{
                    top:getRange(hPosRangeY[0], hPosRangeY[1]),
                    left:getRange(rangex[0],rangex[1])
                },
                isCenter:false,
                rotate:getDeg()
            }
        });
        //将取出的上方图片放回去
       if (imgsArrangeTopArr&&imgsArrangeTopArr[0])
           imgsArrangeArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr);
       //console.log("top",imgsArrangeTopArr)
        //将开始取出的居中图片放回去
        console.log("center",imgsArrangeCenterArr);
        imgsArrangeArr.splice(centerIndex,0,imgsArrangeCenterArr[0]);
        this.setState({imgsArrangeArr:imgsArrangeArr});
    }
    render()
    {
        let imgSources=[];
        datas.forEach((item,index)=>{
            if (!this.state.imgsArrangeArr[index])
            {
                this.state.imgsArrangeArr[index]=
                    {
                        pos: {
                            left: 0,
                            top: 0
                        },
                        rotate: 0,
                        isInverse: false,
                        isCenter: false
                    }
            }
           imgSources.push(<Photo data={item} ref={`img${index}`} styles={this.state.imgsArrangeArr[index]} />)
        });
        return (
            <div className="stage" ref="stage">
                <div className="img-sec">
                    {imgSources}
                </div>
                <div className="controller-nav"></div>
            </div>
        )
    }
}
React.render(<ReactPhotoApp />, document.getElementById('content')); // jshint ignore:line
