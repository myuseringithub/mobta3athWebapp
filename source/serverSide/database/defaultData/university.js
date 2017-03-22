r.db("webapp").tableCreate('university');
var data = [];
data = [
    {
        name: {
            long: 'Universitatea de Medicina si Farmacie "Carol Davila" din Bucuresti',
            short: 'UMFCD'
        },
        link: [
            'http://umfcd.ro/',
            'http://umfcaroldavila.ro/'
        ],
        logo: 'http://www.srrm.ro/upload/poze/1395759637_tmp_umf-carol-davila-1857-1627894619.png'
    }

];

r.db("webapp").table("university").insert(data,
{conflict: "update"}
)