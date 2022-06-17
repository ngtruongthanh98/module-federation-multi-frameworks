import React from "react"
import Button from '@mui/material/Button';

const Body = () => {
    return (
        <div className="m-2 flex flex-row-reverse p-5">
            <div className="space-x-7">
                <Button size="small" onClick={() => window.addToCount()} variant="contained" color="success">
                    Add To Count
                </Button>            
                
                <Button size="small" onClick={() => window.deleteToCount()} variant="contained" color="error">
                    Delete To Count
                </Button>
            </div>
        </div>
    )
}

export default Body