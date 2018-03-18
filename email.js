import React,{Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {sendEmail} from '../../action/admin_action/index'
class Showproduct extends Component {
    constructor(props){
        super(props)
        this.state={
            inform:'',
            email:'',
            subject:'',
            data:''
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({inform:nextProps.inform})
    }

    handleSubmit=()=>{
        console.log('submit data',this.state.email,this.state.subject,this.state.data)

        let formData=new FormData()
        formData.append('receivers',this.state.email)
        formData.append('subject',this.state.subject)
        formData.append('bodymsg',this.state.data)
        this.props.sendEmail(formData)
    }
    handleClear=()=>{
        this.setState({email:'',inform:'',subject:'',data:''})
    }
    render(){
        return(
            <div>
                <form onSubmit={(e)=>{e.preventDefault()}}>
                    Enter SMS receiver name :-
                    <input type="text" value={this.state.email} onChange={(e)=>this.setState({email:e.target.value})}  /><br/>
                    subject :-
                    <input type="text" value={this.state.subject} onChange={(e)=>this.setState({subject:e.target.value})} /><br/>
                    <br/>
                        Message body :-
                        <textarea onChange={(e)=>this.setState({data:e.target.value})} rows="5" column="100" >
                       {this.state.data}
                   </textarea>
                        <br/>
                            <button type="submit" value="submit" onClick={this.handleSubmit}>Submit</button>
                            <button type="button" value="submit" onClick={this.handleClear}>Clear</button>
                </form>
            </div>

        );
    }
}
function  mapStateToProps(state) {
    return{
        inform:state.email
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({sendEmail},dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(Showproduct);


export const sendEmail=(obj)=>{
    return((dispatch)=>{
        console.log("in action of sendEmail...")
        return axios.post('http://localhost:4000/api/email',obj).then((sucess)=>{
            dispatch({type:"send_email",payload:sucess.data})
        })
    })
}


export function send_email_reducers(state=[],action) {
    switch (action.type){
        case "send_email":
            console.log("In email reducer ", action.payload);
            return action.payload;
        default:
            return state;
    }
}



 app.post('/api/email',email.sendEmail)
 

var nodemailer = require('nodemailer');
exports.sendEmail=(req,res)=>{
nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user:'lanetteam.jyoti123@gmail.com', // generated ethereal user
            pass: 'lanetteam1' // generated ethereal password
        }
    });
    // setup email data with unicode symbols
    let mailOptions = {
        from: 'lanetteam.jyoti123@gmail.com', // sender address
        to: req.body.receivers, // list of receivers
        subject:req.body.subject, // Subject line
        text: req.body.bodymsg, // plain text body
        //html: '<b>Hello world?</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.send(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.send("success")
    });
 });
}



