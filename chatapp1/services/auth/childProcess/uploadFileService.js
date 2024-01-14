const {exec} = require('child_process')
const path = require('path'); 
const uploadfileService = async (req, res) => {

    try {

        const filePath = 'C:\\Users\\Alkesh Khedekar\\Desktop\\chatapp1\\chatapp1\\sk.txt'
        const scriptPath = path.join(__dirname, 'fileUploadScript.js');
        
        const command = `node "${scriptPath}" "${filePath}" `

        exec(command, (error , stdout , stderr) => {

            if (error) {
                console.error(`Error to executing uploading script ${error.message}`)
                return res.status(500).json({error: 'Internal Server Error' , message : error.message});
            }

            if (stderr){
                console.error(`File Uplaod script stderr : ${stderr}`)
            }
            console.log('File upload script stdout:', stdout);
            return res.status(200).json({ success: 'File uploaded successfully' });
        }
        )
        
    } catch (error) {
        console.error('error in file upload' , error)
        return res.status(500).josn({error : 'internal server error' , message :error.message})
        
    }
}

module.exports = { uploadfileService}