const {ObjectId} =require('mongodb')
const Report= require('../models/report')

module.exports.sendReport=async function(req, res){
    const id_sender = req.params.id_sender ;
    const id_post = req.params.id_post ;
    const description = req.body.description;
    if(!ObjectId.isValid(id_sender) || !ObjectId.isValid(id_post) ){
        return res.status(401).json('Invalid ID')
    }
   
    /*the same post can have only one report from the same user  */
    Report.find({sender : id_sender ,reported_post : id_post })
          .then(result=>{
            if(result.length > 0){
                return res.status(401).json('Your report is already done')
            }else{ 
                let report= new Report({sender: id_sender , 
                                        reported_post : id_post , 
                                        date :  Date.now() ,
                                        description : description })
                report.save()
                    .then(result=>{
                         res.status(200).json(result)
                    })
                    .catch(error=>{  res.status(401).json(error)})
            }
         })    
        .catch(error=>{ 
             res.status(401).json(error)
        })
    //
   

}

module.exports.getAllReports=function(req, res){
    Report.find()
        .populate("sender","reported_post")
        .then(result=>{
            return res.status(200).json(result)
          })
        .catch(error=>{ res.status(401).json(error)})
}