// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import DB from './data'
const Feed = DB;
export default function FeedApi(req, res) {
  let body = req.query.search;
  let y = getPageData(body.split(","))
  res.status(200).json(y)
}


const getPageData = (rest)=>{
  let arr = Feed;
  arr.length = 1000;
  return arr.filter(p=>{
    for(let i=0; i<rest.length; i++){
      if(p.url.toLowerCase().includes(rest[i].toLowerCase()) || p.emotion.toLowerCase().includes(rest[i].toLowerCase()))return true;
    }
  });
}
