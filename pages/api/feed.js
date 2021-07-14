// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import DB from './data'
const Feed = JSON.parse(DB);
export default function FeedApi(req, res) {
  
  res.status(200).json({ name: 'John Doe' })
}
