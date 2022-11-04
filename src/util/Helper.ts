import ejs from "ejs"
import path from "path"
let pdf = require("html-pdf")
import { Request, Response, NextFunction } from "express"

import { rootDir } from "./path"
import { verifyToken } from "../util/JWT"

export {
  checkToken,
}

// header check by key value pairs
async function checkToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.header('authorization')
  // if err or token is empty or null
  if (!authHeader) {
    const errMsg = {
      token: {
        msg: 'Authorization header is missing',
        location: ''
      }
    }
    return res.status(400).send(errMsg)
  }

  // replace bearer
  const token: string = authHeader.replace("Bearer ", "")

  //  function verified 
  const decoded = await verifyToken(token, next)

  // if token value is wrong
  if (!decoded) {
    return res.status(400).send('Token is not valid')
  }

  return next()
}

// generate pdf
async function generatePDF(
  file: string,
  dataArr: any,
  lang: any = "en"
) {
  let options = {
    height: "11.25in",
    width: "8.5in",
    header: {
      height: "20mm",
    },
    footer: {
      height: "20mm",
    },
  }
  let filePath = await path.join(rootDir(), "views", "pdf", lang, file)

  return new Promise((resolve, reject) => {
    ejs.renderFile(filePath, dataArr, async function (err, data) {
      if (err) {
        console.log("Something goes wrong", err)
        return reject(err)
      }

      await pdf
        .create(data, options)
        .toFile(
          `./public/assets/hrms/${dataArr.id}.pdf`,
          async function (err, data: any) {
            if (err) {
              console.log("Something goes wrong", err)
              return reject(err)
            } else {
              console.log("File created successfully")
              resolve(data)
            }
          }
        )
    })
  })
}
