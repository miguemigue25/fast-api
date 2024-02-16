
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"





import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
// import { Button } from './components/ui/button'

function flashCardMain() {
  return (
    <div>
        <div>
        {/* <h1 className="flex justify-center items-center text-lg font-semibold text-gray-600 m-4"></h1> */}
        </div>
  

        

    <div className='h-screen w-screen'>
    <ResizablePanelGroup
      direction="horizontal"
      className="h-full w-full min-h-[200px]  rounded-lg border"
    >
      <ResizablePanel defaultSize={25} maxSize={25}>
        <div className="flex h-full items-center justify-center bg-gray-200 p-6">
          <span className="font-semibold">
              <Input className='bg-white mb-4' type="Subject" placeholder='Enter flashcard subject' />
            <div className='bg-white p4 rounded-lg shadow p-2 flex flex-col  items-center justify-center'>
              <TableCaption>Flashcards</TableCaption>
              <div className='flex h-full items-center justify-center py-2 '>
              <div>
              </div>
              <div>
              <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">id</TableHead>
                  <TableHead>Subject</TableHead>
                
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">001</TableCell>
                  <TableCell>Math</TableCell>
                
                </TableRow>
              </TableBody>
            </Table>
            </div>
            </div>
            </div>
          </span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75}>
        
        <div className="flex h-full items-center justify-center p-6">
          <div className=" flex w-80 h-100 items-center justify-center bg-gray-200 rounded-lg shadow-md py-60">

            {/* Content for your flashcard */}
          <span className="font-semibold">flash card here</span>
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  </div>
  </div>
  )
}

export default flashCardMain;
