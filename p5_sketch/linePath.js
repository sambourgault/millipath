class LinePath{
    constructor(x,y,l,nbPoints, theta, phi = theta, zMode = 0, amp = 0, p = 1){
        // line position
        this.x = x;
        this.y = y;
        // rotation angle
        this.theta = theta;
        // reflection angle
        this.phi = phi;
        // line length
        this.l = l;
        // points per line object
        this.nbPoints = nbPoints;
        // type of depth mode
        this.zMode = zMode;
        // sinus parameter
        this.amp = amp;
        this.period = p;
        // path
        this.path = [];
        // visualized on the movement
        this.makePath();
    }
    
    makePath(offsetX=0, offsetY=0){
        let z = 0;
        let max = this.l;
        this.path = [];
        
        let tempDelta = this.l/this.nbPoints;
        let rd = random(0.5,1);
        
        for (let i = 0; i < this.nbPoints+1; i++){
            if (this.zMode == 0){                
                // constant max depth
                z = -1;
            } else if (this.zMode == 1){
                // linear ascending: begins at deepest z = -1 and goes to z = 0 
                z = -1+i*abs(tempDelta/max);
            } else if (this.zMode  == 2){
                // linear descending: begins at z = 0 and goes to z = -1
                z = -i*abs(tempDelta/max);
            } else if (this.zMode  == 3){
                // cosinus
                z = this.cosinus(i*abs(tempDelta), 0, max);
            } else if (this.zMode  == 4){
                // positive parabola with min in the middle of the line
                z = this.parabola(i*abs(tempDelta),0,max);
            }

            let x0 = i*tempDelta;
            let y0 = this.amp*cos(2*PI*i/this.period);
            
            // rotation matrix operation around (0,0)
            let x1 = x0*cos(this.theta) - y0*sin(this.theta);
            let y1 = x0*sin(this.theta) + y0*cos(this.theta);

            //reflection matrix operation and final translation
            let xf = x1*cos(2*this.phi) + y1*sin(2*this.phi) + this.x;
            let yf = x1*sin(2*this.phi) - y1*cos(2*this.phi) + this.y;
            this.path.push(new createVector(-xf,yf,z));
        }
        return this.path;
    }
    
    //*** Z FUNCTIONS ***//
    cosinus(x, x0, max){
        let period = max;
        let y = (cos((x-x0)*2*PI/period) - 1.)/2.;
        return y;
    }
    
    parabola(x,zero0,zero1){
        // find 'a' for the deepest y == -1
        let a = 4/pow(zero1-zero0, 2);
        let y = a*(x - zero0)*(x - zero1);
        return y;
    }
    
}