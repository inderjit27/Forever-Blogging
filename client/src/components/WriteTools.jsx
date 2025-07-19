import Embed from  "@editorjs/embed"
import List from  "@editorjs/list"
import Header from  "@editorjs/header"
import Quote from  "@editorjs/quote"
import Marker from  "@editorjs/marker"
import Inlinecode from  "@editorjs/inline-code"

export const tools = {
    embed: Embed,
    list : {
        class: List,
        inlinecode: true 
    },
    header:{
        class: Header,
        config:{
            placeholder: "Type Heading...",
            levels: [2,3],
            default: 2,
        }
    },
    quote: {
        class: Quote,
        inlinecode: true 
    },
    marker: Marker,
    inlinecode: Inlinecode
}