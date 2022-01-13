export { Stack }

/*


*/
class Stack{
    constructor(){
        
        this.size = 0;
        this.buffer = 3; // restricts max. steps which we will go back during the operation
        this.stack = []; // array to simulate  a stack {push and pop can be used in O(1)}

    }


    // just clearing all values from stack
    clear(){
        this.size = 0; 
        this.stack = [];
    }

    // checking is empty or not

    isEmpty(){
        return  ( this.size === 0 );
    }

    // will return top element 

    top(){
        return this.stack[this.size-1];
    }

    
    pop(){
        if(!this.isEmpty()) {
            // if not empty then reducing size
            
            this.size--;
            return this.stack.pop();
        } else{
            return [-1,'']; 
            
            // else returning -1 and empty or null

        }
    }

    /*
        2 operations performed in stack

        1.Insert
        2.Delete

        Assuming buffer = 4
        
        -> when stack is empty we can only perform insert operation
        
        how buffer will work?
            if size if 4 then it will just insert 4 and then rest 4 means it will move like pair
            
            (abcd)(ef)
            
        
    ->In any undo operation only similar operation are removed or inserted



    */


/*
    for 
    1.) Insert -> 0
    2.) Delete -> 1
*/
    push(type, char){
        if(this.isEmpty()){
            if(type===0) //  if stack is empty then push
                this.stack.push([type, char]);
        } else{



            let tmp = this.top();
            if(tmp[0]===type && tmp[1].length < this.buffer){
                let top = this.pop();
                top[1] = char + top[1]; // if inserted abcdef and ef deleted then stack will have fe inside
                                        // it and then to maintain consistency we use this to insert ef if asked to 
// fe--->ef  changing fe to ef 
                this.stack.push(top);
            } else{
                this.stack.push([type, char]);
            }
        }
        this.size++;
    }
}