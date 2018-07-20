//ref:https://www.qiujiawei.com/redblacktree-2/
const Node = function (value) {
	this.value = value;
	this.color = 'red';
	this.left = null;
	this.right = null;
}
function RBT () {

	this.head = null;

	this.findParent = function (target,current=this.head) {

		if ( current ) {
			if ( current.left ) {
				if ( current.left.value == target ) return current;	
				if ( this.findParent(target, current.left) ) { 
					return this.findParent(target, current.left);
				}
				
			}

			if ( current.right ) {
				if ( current.right.value == target ) return current;
				if ( this.findParent(target, current.right) ) {
					return this.findParent(target, current.right);
				}
			}

			return false;
		}

	}
	this.findType = function (current,father,uncle) {
		if ( father.value <= uncle.value && current.value <= father.value ) return 1;
		if ( father.value > uncle.value && current.value > father.value ) return 2;
		if ( father.value <= uncle.value && current.value > father.value ) return 3;
		if ( father.value > uncle.value && current.value <= father.value ) return 4;
	}
	this.rotate = function (current,father,uncle) {
		switch ( this.findType(current,father,uncle) ) {
			//LL
			case 1:
				this.LL();
				console.log(1)
				break;
			//RR
			case 2:
				this.RR();
				console.log(2)
				break;
			case 3:
			//LR
				this.LR();
				console.log(3)
				break;
			case 4:
			//RL
				this.RL();
				console.log(4)
				break;
		}
			
	}
	this.recolor = function (current) {
		// console.log(current.value)
		let father = this.findParent(current.value);
		// console.log(father.value)
		let grandfather = this.findParent( this.findParent(current.value).value );
		// console.log(grandfather.value)
		let uncle = null;
		if ( grandfather.left && grandfather.right ) {
			uncle = (grandfather.left==father) ? grandfather.right:grandfather.left;
		}
		// console.log(uncle.value)
		if (grandfather==this.head ) {
			father.color = 'black';
			return;
		}
		//in this function , father's color already knew as red .
		let flag = 1;
		while ( father!=this.head) {
			flag++;
			// let father = this.findParent(current.value);
			// let grandfather = this.findParent( this.findParent(current.value).value );
			
			if ( uncle && uncle.color == 'black' ) {
				this.rotate(current,father,uncle);
				return
			}else if ( uncle && uncle.color == 'red') {
				uncle.color = 'black';
			}
			//coloring
			if ( flag%2==0 ) {
				father.color = 'black';
			} else {
				father.color = 'red';
			}
			//iterative
			father = this.findParent( father.value );
			if ( grandfather.left && grandfather.right ) {
				uncle = (grandfather.left==father) ? grandfather.right:grandfather.left;
			}
		}
		father.color = 'black';
	}

	this.insert = function (node,current=this.head) {
		
		if ( !this.head ) {
			this.head = node;
			this.head.color = 'black';
			return;
		}

		if ( current ) {
			if ( !current.left && node.value <= current.value ) {
				current.left = node;
				if ( current.color == 'red' ) this.recolor(node);
				return;
			} else if ( !current.right && node.value > current.value ) {
				current.right = node;
				if ( current.color == 'red' ) this.recolor(node);
				return;
			} 
			if ( node.value <= current.value) this.insert( node, current.left );
			else this.insert( node, current.right );

		}


	}
}

var r = new RBT();
r.insert(new Node(80));
r.insert(new Node(40));
r.insert(new Node(20));
r.insert(new Node(10));
r.insert(new Node(9));
// console.log(r.head);
console.log(r.head);

console.log();
console.log()
console.log(r.head.left.left);