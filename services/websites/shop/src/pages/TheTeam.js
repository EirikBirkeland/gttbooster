// Copyright © 2017 Eirik Birkeland. All rights reserved.
/**
 * Created by eb on 23.05.2017.
 */
import React from 'react'
import {Image} from 'react-bootstrap'

export default function TheTeam() {
    return (
        <div>

            <Image src="eirik2.png" circle></Image>
            <h4>Eirik Birkeland - the creator</h4>
            <p><a href="https://www.linkedin.com/in/eirikbirkeland/">https://www.linkedin.com/in/eirikbirkeland/</a></p>
            <Image src="sofia.jpg" circle></Image>
            <h4>Sofia Silva - testing, design and support</h4>
            <p><a href="https://www.linkedin.com/in/sofia-silva-29013b104/">https://www.linkedin.com/in/sofia-silva-29013b104/</a>
            </p>
            <p><em>Sofia is also a skilled English>Portuguese translator seeking to expand her clientele. Hey, she is
                even using a Android phone. *hint hint*</em></p>
            <p>We currently have an office situated in <a
                href="Gunnar-Kr-Kopperud-2013-10-14-225545---Bergen---Nordlys-3_1383425870.jpg">Bergen, Norway</a>. Did
                you know that Bergen sees more rain than most cities in the world? This fact gives us a lot of time to
                get work done ;) We hope that you do not hesitate to get in touch if we can be of assistance!</p>
            <p>Also, thank you very much to the individuals out there who have aided us greatly in developing this
                product. You know who you are!</p>

            <hr/>

            <h3>F.A.Q.</h3>
            <h4>Do you outsource?</h4>
            <p>We believe that outsourcing is for corporations looking to maximize their profit margins at any cost.
                We
                love what we do, and wouldn't think of externalizing any component of our operations, because we
                find it
                natural to know every nook and cranny of what is ultimately OUR product - and hence our full
                responsibility.</p>
            <h4>Are my translations or the original document submitted to your servers?</h4>
            <p>No part of the original document is submitted to the servers, but a very limited part of your
                translations are submitted for spellchecking if you have activated that feature: A scrambled list
            of
            every unique word in the document is sent to the server for spellchecking. The server returns a list of
            words that are 'incorrect', however, <em>no</em> data is stored in connection with this.</p>
        </div>
    )
}