
function k_1(x,y) {
    var a = Math.sin
    , b = Math.cos
    , d = Math.pow
    , c = Math.sqrt
    , e = 6378137
    , g = 0.0033528106647474805
    , k = 500000
    , f = 1
    , h = 0
    , i = 0
    , m = 0
    , j = 0
    , l = 0
    , q = 0
    , w = 0
    , o = 0
    , p = 0
    , s = 0
    , r = 0
    , t = 0
    , v = 0
    , u = 0
    , m = 38
    , o = 127
    , q = 200000
    , l = g;
    1 < l && (l = 1 / l);
    j = Math.atan(1) / 45;
    h = x * j;
    i = y * j;
    m *= j;
    j *= o;
    l = 1 / l;
    w = e * (l - 1) / l;
    o = (d(e, 2) - d(w, 2)) / d(e, 2);
    l = (d(e, 2) - d(w, 2)) / d(w, 2);
    w = (e - w) / (e + w);
    p = e * (1 - w + 5 * (d(w, 2) - d(w, 3)) / 4 + 81 * (d(w, 4) - d(w, 5)) / 64);
    s = 3 * e * (w - d(w, 2) + 7 * (d(w, 3) - d(w, 4)) / 8 + 55 * d(w, 5) / 64) / 2;
    r = 15 * e * (d(w, 2) - d(w, 3) + 3 * (d(w, 4) - d(w, 5)) / 4) / 16;
    t = 35 * e * (d(w, 3) - d(w, 4) + 11 * d(w, 5) / 16) / 48;
    v = 315 * e * (d(w, 4) - d(w, 5)) / 512;
    i -= j;
    m = p * m - s * a(2 * m) + r * a(4 * m) - t * a(6 * m) + v * a(8 * m);
    w = m * f;
    u = a(h);
    m = b(h);
    j = u / m;
    l *= d(m, 2);
    o = e / c(1 - o * d(a(h), 2));
    h = p * h - s * a(2 * h) + r * a(4 * h) - t * a(6 * h) + v * a(8 * h);
    a = [];
    h *= f;
    p = o * u * m * f / 2;
    s = o * u * d(m, 3) * f * (5 - d(j, 2) + 9 * l + 4 * d(l, 2)) / 24;
    r = o * u * d(m, 5) * f * (61 - 58 * d(j, 2) + d(j, 4) + 270 * l - 330 * d(j, 2) * l + 445 * d(l, 2) + 324 * d(l, 3) - 680 * d(j, 2) * d(l, 2) + 88 * d(l, 4) - 600 * d(j, 2) * d(l, 3) - 192 * d(j, 2) * d(l, 4)) / 720;
    u = o * u * d(m, 7) * f * (1385 - 3111 * d(j, 2) + 543 * d(j, 4) - d(j, 6)) / 40320;
    h = h + d(i, 2) * p + d(i, 4) * s + d(i, 6) * r + d(i, 8) * u;
    a[1] = h - w + k;
    h = o * m * f;
    w = o * d(m, 3) * f * (1 - d(j, 2) + l) / 6;
    l = o * d(m, 5) * f * (5 - 18 * d(j, 2) + d(j, 4) + 14 * l - 58 * d(j, 2) * l + 13 * d(l, 2) + 4 * d(l, 3) - 64 * d(j, 2) * d(l, 2) - 25 * d(j, 2) * d(l, 3)) / 120;
    m = o * d(m, 7) * f * (61 - 479 * d(j, 2) + 179 * d(j, 4) - d(j, 6)) / 5040;
    a[0] = q + i * h + d(i, 3) * w + d(i, 5) * l + d(i, 7) * m;
    return [2.5 * a[0],2.5 * a[1]]
}
function k_2(x,y,size){
x=3.2 * x + 24E4
y=3.2 * y + 48E4
b = 1838720
c = 4066832
n = Math.pow(2,-size)
S=355
O=500
return [b + Math.floor((x - b) * n - S / 2) / n,c + Math.floor((y - c) * n - O / 2) / n]
}


function kakao_map_xyz(x,y,size){
    let [x1,y1]=k_1(x,y)
    let [x2,y2]=k_2(x1,y1,size)
    return [Math.floor(x2 / 256 * Math.pow(2,-size)),Math.floor(y2 / 256 *Math.pow(2,-size)),size]
}

function kakao_map_image_url(x,y,size){
    let [_x,_y,_s]=kakao_map_xyz(x,y,size)
    return `https://map.daumcdn.net/map_k3f_prod/bakery/image_map_png/PNG01/v29_9jh91/${_s}/${_y+1}/${_x+1}.png`
}
module.exports ={
    kakao_map_image_url
}
