#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846

uniform vec2 u_resolution; // This is passed in as a uniform from the sketch.js file
uniform vec2 u_mouse;
uniform vec2 u_time;

float line(vec2 st, float y){
  return smoothstep( y-0.01, y, st.y) -
          smoothstep( y, y+0.01, st.y);
}

float circle( vec2 st, vec2 pos, float r){
  return step(distance(st, pos), r);
}

float smoothCircle( vec2 st, vec2 pos, float r){
  return smoothstep(r, r+0.5, distance(st, pos));
}

float maxSDF(float f1, float f2){
  return max(f1, f2);
}

vec3 sdgSMin( in vec3 a, in vec3 b, in float k )
{
    float h = max(k-abs(a.x-b.x),0.);
    float m = 0.25*h*h/k; // [0 - k/4] for [|a-b|=k - |a-b|=0]
    float n = 0.50*  h/k; // [0 - 1/2] for [|a-b|=k - |a-b|=0]
    return vec3( min(a.x,  b.x) - m, 
                 mix(a.yz, b.yz, (a.x<b.x)?n:1.0-n) );
}

vec3 sdgCircle( in vec2 p, in float r ) 
{
    float d = length(p);
    return vec3( d-r, p*p/d );
}


void main() {
  //vec2 size = vec2(0.5,0.5) ;
  // position of the pixel divided by resolution, to get normalized positions on the canvas
  vec2 st = gl_FragCoord.xy/u_resolution.xy; 
  st  -= 0.5;
  st.x = st.x * u_resolution.x / u_resolution.y;
  //st.x *= 10.; 
  //vec2 m = u_mouse/u_resolution.xy;
  float f1 = circle(st, vec2(0.15, 0.), 0.1);
  float f2 = smoothCircle(st, vec2(-0.05, 0.), 0.2);
  vec3 color = 1.-vec3(f2);
  //color = vec3(max(f1, f2));
  float y = smoothstep(0.1,0.9,st.x);
  y = 2.*st.x;
  //color += vec3(1., 0., 0.)*line(st, y);
  
  
  vec3 dg1 = sdgCircle(st + vec2(0.1,0.0),0.2);
  vec3 dg2 = sdgCircle( st - vec2(0.2,0.0), 0.04) ;

  //return sdgMin(dg1,dg2);
  //vec3 s = sdgSMin(dg1,dg2,0.6*u_mouse.x/u_resolution.x);
  vec3 s = sdgSMin(dg1,dg2,0.2);
  float d = s.x;
    vec2  g = s.yz;

	// coloring
    vec3 col = (d>0.0) ? vec3(0.) : vec3(1.);
  
  gl_FragColor = vec4(col,1.0); // R,G,B,A

  // you can only have one gl_FragColor active at a time, but try commenting the others out
  // try the green component

  //gl_FragColor = vec4(0.0,st.x,0.0,1.0); 

  // try both the x position and the y position
  
  //gl_FragColor = vec4(st.x,st.y,0.0,1.0); 
}