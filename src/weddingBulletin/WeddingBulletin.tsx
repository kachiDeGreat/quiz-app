import React from "react";
import styles from "./WeddingBulletin.module.css";

const WeddingBulletin: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* --- HERO / COVER PAGE (FULL SCREEN RESPONSIVE) --- */}
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.subTitle}>
            Solemnization of Holy Matrimony Between
          </div>

          <h1 className={styles.coupleNames}>
            Miss Kosisochukwu Obioma Nwakwue
            <span className={styles.amp}>&</span>
            Rev’d Ndukaku Chinazaekpere Nwakwue
          </h1>

          <div className={styles.officiatingBox}>
            <p className={styles.label}>Officiating Minister</p>
            <p className={styles.bishopName}>
              His Lordship, Rt. Rev. Prof. Nneoyi Onen Egbe
            </p>
            <p>(Lord Bishop of Diocese of Calabar)</p>
          </div>

          <div className={styles.supportingMinisters}>
            <p>
              <strong>Assisted By:</strong> Archdeacons, Canons, Priests &
              Deacons
            </p>
            <p>
              <strong>Organist/Choirmaster:</strong> Mr. Samuel Akpan
            </p>
            <p>
              <strong>Music:</strong> Christ Church Anglican Choir & The
              Anglican Praise Band
            </p>
          </div>
        </div>

        {/* --- SCROLL INDICATOR --- */}
        <div
          className={styles.scrollIndicator}
          onClick={() =>
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
          }
        >
          <span className={styles.scrollText}>Swipe Up</span>
          <div className={styles.arrow}>↓</div>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <div className={styles.mainContent}>
        {/* --- ORDER OF SERVICE --- */}
        <section className={styles.card}>
          <h2 className={styles.sectionTitle}>Order of Service</h2>

          <div className={styles.serviceItem}>
            <span className={styles.label}>Processional</span>
            <div className={styles.itemTitle}>Bridal March (Organ Recital)</div>
          </div>

          <div className={styles.serviceItem}>
            <span className={styles.label}>Opening Hymn: CNH 50</span>
            <div className={styles.itemTitle}>Blessed Assurance</div>
            <div className={styles.lyrics}>
              <div className={styles.verse}>
                1 Blessed assurance, Jesus is mine! Oh, what a foretaste of
                glory divine! Heir of salvation, purchase of God, born of his
                Spirit, washed in his blood.
              </div>
              <div className={styles.refrain}>
                Refrain: This is my story, this is my song, praising my Savior
                all the day long. This is my story, this is my song, praising my
                Savior all the day long.
              </div>
              <div className={styles.verse}>
                2 Perfect communion, perfect delight, visions of rapture now
                burst on my sight. Angels descending bring from above echoes of
                mercy, whispers of love. [Refrain]
              </div>
              <div className={styles.verse}>
                3 Perfect submission, all is at rest. I in my Savior am happy
                and bless’d, watching and waiting, looking above, filled with
                his goodness, lost in his love. [Refrain]
              </div>
            </div>
          </div>

          <div className={styles.serviceItem}>
            <span className={styles.label}>The Service</span>
            <div className={styles.itemTitle}>Introduction</div>
            <p className={styles.rubric}>
              Dear people of God, we have come together in the presence of God,
              to witness and to celebrate the marriage of Kosisochukwu and
              Ndukaku to ask His blessing on them, and to share in their joy.
            </p>
            <p className={styles.scriptureText}>
              Our Lord Jesus Christ was Himself a guest at a wedding in Cana of
              Galilee and blessed this way of life, and through His Spirit He is
              with us now.
            </p>
            <p className={styles.scriptureText}>
              The Scriptures teach us that marriage is a gift of God in creation
              and a means of His grace, a holy mystery in which man and woman
              become one flesh.
            </p>
            <p className={styles.scriptureText}>
              It is God’s purposes that, as husband and wife give themselves to
              each other in love throughout their lives, they shall be united in
              their love as Christ is united with His Church.
            </p>
            <p className={styles.scriptureText}>
              Marriage is given primarily that husband and wife may comfort and
              help each other, living faithfully together in need and in plenty,
              in sorrow and in joy.
            </p>
            <p className={styles.scriptureText}>
              It is also given, that with delight and tenderness, they may know
              each other in love, and through the joy of their bodily union, may
              strengthen the union of their hearts and lives.
            </p>
            <p className={styles.scriptureText}>
              Lastly, it is given that they may have children and be blessed in
              caring for them and bringing Them up in accordance with God’s
              will, to His praise and glory.
            </p>
            <p className={styles.scriptureText}>
              In marriage, husband and wife belong to one another, and are
              linked to each other’s family and they begin a new life together
              in the community.
            </p>
            <p className={styles.scriptureText}>
              This is a way of life that all should honor; and it must not be
              undertaken carelessly, lightly or selfishly but reverently,
              responsibly, and after serious thought.
            </p>
            <p className={styles.scriptureText}>
              Into this way of life Kosisochukwu and Ndukaku come now to be
              joined.
            </p>
            <p className={styles.scriptureText}>
              If anyone of you can show just cause why they may not lawfully be
              married you must now.
            </p>
          </div>

          <div className={styles.serviceItem}>
            <div className={styles.itemTitle}>Declaration</div>
            <p className={styles.rubric}>The Priest says to the couple:</p>
            <p className={styles.scriptureText}>
              Kosisochukwu and Ndukaku the vows you are about to take are to be
              made in the name of God and I charge you both, as you will answer
              before God who is the judge of all and who knows all the secrets
              of our hearts: that if either of you knows a reason why you may
              not lawfully marry, you must declare it now.
            </p>

            <p className={styles.rubric}>
              If there is no impediment declared, the Priest continues. The
              congregation sits while the couple stand and the Priest says to
              the bridegroom:
            </p>

            <div className={styles.responseRow}>
              <span className={styles.role}>Priest:</span>
              <span>
                Ndukaku of your own free choice, will you take Kosisochukwu to
                be your wife?
              </span>
            </div>
            <div className={styles.responseRow}>
              <span className={styles.role}>Groom:</span>
              <span>I will.</span>
            </div>
            <div className={styles.responseRow}>
              <span className={styles.role}>Priest:</span>
              <span>
                Will you love her, comfort her, honor and protect her, in
                sickness and in health, in poverty and prosperity and, forsaking
                all others, be faithful to her as long as you both shall live?
              </span>
            </div>
            <div className={styles.responseRow}>
              <span className={styles.role}>Groom:</span>
              <span>I will.</span>
            </div>

            <p className={styles.rubric}>The priest says to the bride:</p>
            <div className={styles.responseRow}>
              <span className={styles.role}>Priest:</span>
              <span>
                Kosisochukwu of your own free choice, will you take Ndukaku to
                be your husband?
              </span>
            </div>
            <div className={styles.responseRow}>
              <span className={styles.role}>Bride:</span>
              <span>I will.</span>
            </div>
            <div className={styles.responseRow}>
              <span className={styles.role}>Priest:</span>
              <span>
                Will you love him, comfort him, honor and protect him, in
                sickness and in health, in poverty and prosperity and, forsaking
                all others, be faithful to his as long as you both shall live?
              </span>
            </div>
            <div className={styles.responseRow}>
              <span className={styles.role}>Bride:</span>
              <span>I will.</span>
            </div>
          </div>

          <div className={styles.serviceItem}>
            <div className={styles.itemTitle}>The Marriage</div>
            <p className={styles.rubric}>
              Then the Priest asks: Who gives this woman to be married to this
              man?
            </p>
            <p className={styles.rubric}>
              The father or the representative of the family comes out and says
              “I do”. He then hands over the Bride to the Priest.
            </p>
            <p className={styles.rubric}>
              The Priest receiving the bride from the hand of her father, shall
              cause the man to take the woman by his right hand, facing each
              other, the bridegroom says:
            </p>

            <div className={styles.vowsContainer}>
              <span className={styles.speaker}>The Bridegroom:</span>
              <span className={styles.spoken}>
                "I, Ndukaku, take you, Kosisochukwu, to be my wife, to have and
                to hold from this day forward; for better, for worse, for
                richer, for poorer, in sickness and in health, to love and to
                cherish, till death us do part; according to God’s holy law. In
                the presence of God I make this solemn vow."
              </span>
              <p className={styles.rubric}>
                They loose hands. The bride takes the bridegroom’s right hand in
                hers, and says:
              </p>
              <span className={styles.speaker}>The Bride:</span>
              <span className={styles.spoken}>
                "I, Kosisochukwu, take you, Ndukaku, to be my husband, to have
                and to hold from this day forward; for better, for worse, for
                richer, for poorer, in sickness and in health, to love and to
                cherish, till death us do part; according to God’s holy law. In
                the presence of God I make this solemn vow."
              </span>
            </div>
          </div>

          <div className={styles.serviceItem}>
            <div className={styles.itemTitle}>Giving of Rings</div>
            <p className={styles.prayerText}>
              <strong>Priest:</strong> And what token do you share to represent
              your love and commitment to each other?
            </p>
            <p className={styles.rubric}>
              The Priest receives the ring(s). (holding up the ring, says):
            </p>
            <p className={styles.prayerText}>
              The ring is the symbol of wholeness and perfection. It is made of
              gold which is a precious and durable metal. What better
              representation of your feelings for each other!
            </p>
            <p className={styles.prayerText}>
              <strong>Priest:</strong> Heavenly Father, by your blessing, let
              these rings be to Ndukaku and Kosisochukwu a symbol of ending love
              and faithfulness, to remind them of the vow and covenant which
              they have made this day; through Jesus Christ our Lord. Amen.
            </p>

            <div className={styles.vowsContainer}>
              <p className={styles.rubric}>
                The bridegroom places the ring on the fourth finger of the
                bride’s left hand and holding it there, says:
              </p>
              <span className={styles.speaker}>Bridegroom:</span>
              <span className={styles.spoken}>
                "Kosisochukwu, I give you this ring as a sign of our marriage
                and a token of my love and fidelity to you. With my body I
                honour you, all that I am I give you and all that I have I share
                with you, within the love of God, the Father, Son and Holy
                Spirit. Amen."
              </span>

              <p className={styles.rubric}>
                If the rings are exchanged, they loose hands and bride places a
                ring on the fourth finger of the bridegroom’s left hand, and
                holding it there says:
              </p>
              <span className={styles.speaker}>Bride:</span>
              <span className={styles.spoken}>
                "Ndukaku, I give you this ring as a sign of our marriage and a
                token of my love and fidelity to you. With my body I honour you,
                all that I am I give you and all that I have I share with you,
                within the love of God, the Father, Son and Holy Spirit. Amen."
              </span>
            </div>
          </div>

          <div className={styles.serviceItem}>
            <div className={styles.itemTitle}>Proclamation & Blessing</div>
            <p className={styles.rubric}>
              The bride and groom kneel. While the congregation remains
              standing. The priest says:
            </p>
            <p className={styles.prayerText}>
              Eternal God, Creator and Preserver of all mankind, Giver of all
              spiritual grace, the Author of everlasting life: Send thy blessing
              upon Ndukaku and Kosisochukwu whom we bless in thy Name; that,
              living faithfully together they may fulfill the vow and covenant
              they made of which the ring given and received is a token and
              pledge, and may ever remain in perfect love and peace together,
              and live according to thy laws; through Jesus Christ our Lord.
              Amen.
            </p>
            <p className={styles.prayerText}>
              Now that Ndukaku and Kosisochukwu have given their consent and
              made their vows to each other before God and this congregation,
              with the joining of hands and the giving and receiving of ring, in
              the name of God, I declare that they are husband and wife.
            </p>
            <p className={styles.rubric}>
              The Priest joins their right hands together, and say,
            </p>
            <p className={styles.prayerText}>
              Those whom God hath joined together let no man put asunder. Amen.
            </p>
            <p className={styles.rubric}>The Priest blesses them:</p>
            <p className={styles.prayerText}>
              God the Father, God the Son, God the Holy Ghost, bless, preserve,
              and keep you; the Lord pour upon you riches of His grace that you
              may live together and receive the blessings of eternal life. Amen.
            </p>
          </div>

          <div className={styles.serviceItem}>
            <div className={styles.itemTitle}>Family Blessing</div>
            <p className={styles.prayerText}>
              <strong>Priest (To Parents):</strong> As Ndukaku and Kosisochukwu
              enter a new life together will you their parents give them your
              blessings in the presence of this congregation?
            </p>
            <p className={styles.prayerText}>
              <strong>The parents pray for the couple saying:</strong> May God
              bless you both. Amen.
            </p>
            <p className={styles.rubric}>
              The congregation stands, the Priest may ask:
            </p>
            <p className={styles.prayerText}>
              <strong>Priest:</strong> You, as friends and families, have come
              to witness this exchange of vows. Will you do all in your power to
              support this marriage now and in the years ahead?
            </p>
            <p className={styles.prayerText}>
              <strong>The people reply:</strong> We will.
            </p>
            <p className={styles.rubric}>
              The congregation remain standing: The husband and wife kneel and
              the Priest blesses them:
            </p>
            <p className={styles.prayerText}>
              God the Father, God the Son, God the Holy Ghost, bless, preserve,
              and keep you; the Lord pour upon you riches of His grace that you
              may live together and receive the blessings of eternal life. Amen.
            </p>

            <p className={styles.rubric}>
              The Parents of the bridegroom or their representatives will move
              forward.
            </p>
            <p className={styles.prayerText}>
              <strong>Priest:</strong> In the name of God and in the presence of
              this congregation we hand Kosisochukwu and Mrs Kosisochukwu
              Ndukaku to you as a full member of your family. Will you promise
              on behalf of your family to continue to up-hold them in your
              prayer and give them your moral support?
            </p>
            <p className={styles.prayerText}>
              <strong>The parents of the groom:</strong> We promise in the name
              of God.
            </p>
            <p className={styles.rubric}>
              (The Priest then prays for the families.)
            </p>
            <p className={styles.prayerText}>
              Eternal God, creator and sustainer of us all, give your grace to
              the family of Ndukaku, Grant them that in the years ahead they may
              live together in the love, joy and peace of our Saviour Jesus
              Christ. Amen
            </p>
          </div>

          <div className={styles.serviceItem}>
            <div className={styles.itemTitle}>The Collect</div>
            <div className={styles.responseRow}>
              <span className={styles.role}>Celebrant:</span>
              <span>The Lord be with you</span>
            </div>
            <div className={styles.responseRow}>
              <span className={styles.role}>People:</span>
              <span>And also with you.</span>
            </div>
            <div className={styles.responseRow}>
              <span className={styles.role}>Celebrant:</span>
              <span>Let us Pray</span>
            </div>
            <p className={styles.prayerText}>
              O gracious and everliving God, You have created us male and female
              in Your image: Look mercifully upon this man and this woman who
              have come to you seeking your blessing and assist them with Your
              grace, that with true fidelity and steadfast love they may honour
              and keep the promises and vows they have made; through Jesus
              Christ our Saviour who live and reigns with You in the unity of
              the holy Spirit, One God forever and ever. Amen.
            </p>
          </div>

          <section>
            <h3 className={styles.sectionTitle}>Ministry of the Word</h3>

            <div className={styles.serviceItem}>
              <span className={styles.scriptureRef}>
                Old Testament Reading: Song of Solomon 2:10-13
              </span>
              <p className={styles.scriptureText}>
                10 My beloved spake, and said unto me, Rise up, my love, my fair
                one, and come away.
              </p>
              <p className={styles.scriptureText}>
                11 For, lo, the winter is past, the rain is over and gone;
              </p>
              <p className={styles.scriptureText}>
                12 The flowers appear on the earth; the time of the singing of
                birds is come, and the voice of the turtle is heard in our land;
              </p>
              <p className={styles.scriptureText}>
                13 The fig tree putteth forth her green figs, and the vines with
                the tender grape give a good smell. Arise, my love, my fair one,
                and come away.
              </p>
            </div>

            <div className={styles.serviceItem}>
              <span className={styles.scriptureRef}>
                Psalm 128: Beati omnes
              </span>
              <p className={styles.scriptureText}>
                1 Blessed are all they that fear the Lord : and walk in his
                ways.
              </p>
              <p className={styles.scriptureText}>
                2 For thou shalt eat the labours of thine hands : O well is
                thee, and happy shalt thou be.
              </p>
              <p className={styles.scriptureText}>
                3 Thy wife shall be as the fruitful vine : upon the walls of
                thine house.
              </p>
              <p className={styles.scriptureText}>
                4 Thy children like the olive- branches : round about thy table.
              </p>
              <p className={styles.scriptureText}>
                5 Lo, this shall the man be bless-ed : that fear- eth the Lord.
              </p>
              <p className={styles.scriptureText}>
                6 The Lord from out of Sion shall so bless thee: that thou shalt
                see Jerusalem in pros perity all thy life long.
              </p>
              <p className={styles.scriptureText}>
                7 Yea, that thou shalt see thy children’s children: and peace
                up- on Israel.
              </p>
              <p className={styles.scriptureText}>
                Glory be to the Father, and to the Son, and to the Holy Spirit;
                as it was in the beginning, is now: and shall be, forever. Amen.
              </p>
            </div>

            <div className={styles.serviceItem}>
              <span className={styles.scriptureRef}>
                Epistle: Colossians 3: 12-24
              </span>
              <p className={styles.scriptureText}>
                12 Put on therefore, as the elect of God, holy and beloved,
                bowels of mercies, kindness, humbleness of mind, meekness,
                longsuffering;
              </p>
              <p className={styles.scriptureText}>
                13 Forbearing one another, and forgiving one another, if any man
                have a quarrel against any: even as Christ forgave you, so also
                do ye.
              </p>
              <p className={styles.scriptureText}>
                14 And above all these things put on charity, which is the bond
                of perfectness.
              </p>
              <p className={styles.scriptureText}>
                15 And let the peace of God rule in your hearts, to the which
                also ye are called in one body; and be ye thankful.
              </p>
              <p className={styles.scriptureText}>
                16 Let the word of Christ dwell in you richly in all wisdom;
                teaching and admonishing one another in psalms and hymns and
                spiritual songs, singing with grace in your hearts to the Lord.
              </p>
              <p className={styles.scriptureText}>
                17 And whatsoever ye do in word or deed, do all in the name of
                the Lord Jesus, giving thanks to God and the Father by him.
              </p>
              <p className={styles.scriptureText}>
                18 Wives, submit yourselves unto your own husbands, as it is fit
                in the Lord.
              </p>
              <p className={styles.scriptureText}>
                19 Husbands, love your wives, and be not bitter against them.
              </p>
              <p className={styles.scriptureText}>
                20 Children, obey your parents in all things: for this is well
                pleasing unto the Lord.
              </p>
              <p className={styles.scriptureText}>
                21 Fathers, provoke not your children to anger, lest they be
                discouraged.
              </p>
              <p className={styles.scriptureText}>
                22 Servants, obey in all things your masters according to the
                flesh; not with eyeservice, as men pleasers; but in singleness
                of heart, fearing God;
              </p>
              <p className={styles.scriptureText}>
                23 And whatsoever ye do, do it heartily, as to the Lord, and not
                unto men;
              </p>
              <p className={styles.scriptureText}>
                24 Knowing that of the Lord ye shall receive the reward of the
                inheritance: for ye serve the Lord Christ.
              </p>
            </div>

            <div className={styles.serviceItem}>
              <span className={styles.label}>The Gradual Hymn: CNH 81</span>
              <div className={styles.itemTitle}>Be Thou My Vision</div>
              <div className={styles.lyrics}>
                <div className={styles.verse}>
                  1. Be thou my vision, O Lord of my heart; Naught be all else
                  to me save that thou art. Thou my best thought by day and by
                  night; Waking or sleeping, thy presence my light.
                </div>
                <div className={styles.verse}>
                  2. Be thou my wisdom, and thou my true Word; I ever with thee
                  and thou with me, Lord. Thou my great Father, I thy dear
                  child; Thou in me dwelling, with thee reconciled.
                </div>
                <div className={styles.verse}>
                  3. Be thou my breastplate, my sword for the fight; Be thou my
                  dignity, thou my delight. Thou my soul's shelter, thou my high
                  tow'r; Raise thou me Heav'nward, O Pow'r of my pow'r.
                </div>
                <div className={styles.verse}>
                  4. Riches I heed not, nor vain, empty praise; Thou mine
                  inheritance, now and always. Thou and thou only, first in my
                  heart, High King of Heaven, my treasure thou art.
                </div>
                <div className={styles.verse}>
                  5. High King of Heaven, my victory won, May I reach Heaven's
                  joys, O bright Heav'ns Sun! Heart of my heart, whatever
                  befall, Still be my vision, O Ruler of all. Amen.
                </div>
              </div>
            </div>

            <div className={styles.serviceItem}>
              <span className={styles.scriptureRef}>
                The Gospel: John 15:9-12
              </span>
              <p className={styles.scriptureText}>
                9 As the Father hath loved me, so have I loved you: continue ye
                in my love.
              </p>
              <p className={styles.scriptureText}>
                10 If ye keep my commandments, ye shall abide in my love; even
                as I have kept my Father's commandments, and abide in his love.
              </p>
              <p className={styles.scriptureText}>
                11 These things have I spoken unto you, that my joy might remain
                in you, and that your joy might be full.
              </p>
              <p className={styles.scriptureText}>
                12 This is my commandment, that ye love one another, as I have
                loved you.
              </p>
              <p className={styles.rubric}>
                Priest: This is the Gospel of Christ.
              </p>
            </div>
          </section>

          <div className={styles.serviceItem}>
            <div className={styles.itemTitle}>Anglican Praise Band</div>
          </div>

          <div className={styles.serviceItem}>
            <span className={styles.label}>Hymn for Sermon: CNH 757</span>
            <div className={styles.itemTitle}>God, Give Us Christian Homes</div>
            <div className={styles.lyrics}>
              <div className={styles.verse}>
                1. God, give us Christian homes. Homes where the Bible is loved
                and taught. Homes where the Master’s will is sought. Homes
                crowned with beauty Your love has wrought. God, give us
                Christian homes. God, give us Christian homes.
              </div>
              <div className={styles.verse}>
                2. God, gives us Christian homes. Homes where the father is true
                and strong. Homes that are free from the blight of wrong. Homes
                that are joyous with love and song. God, give us Christian
                homes, God, give us Christian homes.
              </div>
              <div className={styles.verse}>
                3. God, give us Christian homes. Home where the mother in
                queenly quest. Strives to show others Your ways is best. Homes
                where the Lord is a honored guest. God, give us Christian homes,
                God, give us Christian homes.
              </div>
              <div className={styles.verse}>
                4. God, give us Christian homes. Homes where the children are
                led to know. Christ in His beauty who loves them so. Homes where
                the altar fires burn and glow. God, give us Christian homes,
                God, give us Christian homes. Amen.
              </div>
            </div>
          </div>

          <div className={styles.serviceItem}>
            <div className={styles.itemTitle}>The Sermon</div>
          </div>

          <div className={styles.serviceItem}>
            <div className={styles.itemTitle}>Nicene Creed</div>
            <p className={styles.prayerText}>
              ALL: We believe in one God, the Father, the Almighty, maker of
              heaven and earth, of all that is seen and unseen.
            </p>
            <p className={styles.prayerText}>
              We believe in one Lord, Jesus Christ, the only Son of God,
              eternally begotten of the Father God from God, Light from Light,
              true God from true God, begotten, not made, of one being with the
              Father through Him all things were made. For us men and for our
              salvation, He came down from heaven; by the power of the Holy
              Spirit, He became incarnate of the Virgin Mary and was made man.
              For our sake He was crucified under Pontius Pilate: He suffered
              death and was buried.
            </p>
            <p className={styles.prayerText}>
              On the third day He rose again in accordance with the scriptures;
              He ascended into heaven, and is seated at the right hand of the
              Father. He will come again in glory, to judge the living and the
              dead, · and His kingdom will have no end.
            </p>
            <p className={styles.prayerText}>
              We believe in the Holy Spirit, the Lord, the Giver of life, who
              proceeds from the Father and the Son. With the Father and the Son
              He is worshipped and glorified; He has spoken through the
              prophets.
            </p>
            <p className={styles.prayerText}>
              We believe in one, Holy, Catholic and Apostolic Church; we
              acknowledge one baptism for the forgiveness of sins. We look for
              the resurrection of the dead, and the life of the world to come.
              Amen.
            </p>
          </div>

          <div className={styles.serviceItem}>
            <div className={styles.itemTitle}>
              Ministration By The Christ Church Choir
            </div>
          </div>

          <div className={styles.serviceItem}>
            <div className={styles.itemTitle}>Offering – Praise Team</div>
          </div>

          <div className={styles.serviceItem}>
            <span className={styles.label}>Hymn for Prayer: CNH 707</span>
            <div className={styles.itemTitle}>O Perfect Love</div>
            <div className={styles.lyrics}>
              <div className={styles.verse}>
                1. O perfect Love, all human thought transcending. Lowly we
                kneel in prayer before your throne. That theirs may be the love
                which knows no ending. Whom You for evermore have joined in one.
              </div>
              <div className={styles.verse}>
                2. O perfect Life, now be their full assurance. Of tender
                charity and steadfast faith; Of patient hope and quiet brave
                endurance. With child like trust that fears nor pain nor death.
              </div>
              <div className={styles.verse}>
                3. Grant them the joy which brightens earthly sorrow, Grant them
                the peace, which calms all earthly strife; And to life’s day the
                glorious unknown morrow. That dawns upon eternal love and life.
              </div>
              <div className={styles.verse}>
                4. Hear us, O Father, gracious and forgiving, Through Jesus
                Christ Your co-eternal Word; Who with Holy Spirit by all things
                living, Now and to endless ages are adored. Amen.
              </div>
            </div>
          </div>

          <div className={styles.serviceItem}>
            <div className={styles.itemTitle}>Prayers</div>
            <p className={styles.prayerText}>
              Almighty and Most Merciful Father, the strength of all who put
              their trust in You: we pray that, as You have brought Kosisochukwu
              and Ndukaku together by Your providence, so You will enrich them
              by Your grace; that those vows which they have made to one another
              in Your sight, they may truly and faithfully Perform; through
              Jesus Christ our Lord. Amen.
            </p>
            <p className={styles.prayerText}>
              Almighty Father, You have created all mankind to glorify You in
              body and in spirit. Give these your children joy in one another,
              as living temples of the Holy Spirit, and bring them by this joy
              to know and share in Your creative and redeeming love; through
              Jesus Christ our Lord. Amen.
            </p>
            <p className={styles.prayerText}>
              Eternal God, true and loving Father, in holy marriage you make
              your servants one. May their life together witness to Your love in
              this troubled world; may unity overcome division, forgiveness heal
              injury, and joy triumph over sorrow; through Jesus Christ our
              Lord. Amen
            </p>
            <p className={styles.prayerText}>
              We praise You, Father, that you have made all things, and hold all
              things in being. In the beginning you created the universe, and
              made mankind in Your own likeness: because it was not good for
              them to be alone you created them male and female; and in marriage
              you join man and woman as one flesh, teaching us that what You
              have united may never be divided.
            </p>
            <p className={styles.prayerText}>
              We praise You that You have made this holy mystery a symbol of the
              marriage of Christ with his Church, and an image of Your eternal
              covenant with Your people. And we praise You that You have made
              this man and this woman, who come before You as partners and heirs
              together of Your promises. Grant that this man may love his wife
              as Christ loves His Bride the Church, giving Himself for it and
              cherishing it as His own flesh; and grant that this woman may love
              her husband and follow the example of those holy women whose
              praises are sung in the Scriptures. Strengthen them with your
              grace that they may be witnesses of Christ to others; let them
              live to see their children’s children, and bring them at the last
              to fullness of life with Your saints in the kingdom of heaven;
              through Jesus Christ our Lord. Amen.
            </p>
            <p className={styles.prayerText}>
              Heavenly Father, we thank You that in our earthly lives You speak
              to us of Your eternal life: we pray that through their marriage
              Kosisochukwu and Ndukaku may know You more clearly, love You more
              dearly and follow You more nearly, day by day: through Jesus
              Christ our Lord. Amen.
            </p>
            <p className={styles.prayerText}>
              O God of love, look mercifully upon Kosisochukwu and Ndukaku in
              the new life which they begin together this day. Unite them
              evermore in your love. Keep them faithful to the vows they have
              made one to the other. Strengthen them with every good gift, and
              let Your peace be with them, now and always; for the sake of Jesus
              Christ our Lord, Amen.
            </p>
            <p className={styles.prayerText}>
              Almighty God, our Heavenly Father, who gave marriage to be a
              source of blessing to mankind, we thank You for the joys of family
              life. May we know Your presence and peace in our homes; fill them
              with Your love, and use them for Your glory; through Jesus Christ
              our Lord. Amen.
            </p>
          </div>

          <div className={styles.serviceItem}>
            <div className={styles.itemTitle}>The Peace</div>
            <p className={styles.rubric}>
              President: Christ is our peace, He has reconciled us to God in One
              Body by the cross. We meet in His name and share His peace. The
              peace of the Lord be always with you.
            </p>
            <p className={styles.rubric}>All: And also with you.</p>
            <p className={styles.rubric}>
              President: Let us offer one another a sign of peace.
            </p>
          </div>

          {/* Offertory */}
          <div className={styles.serviceItem}>
            <span className={styles.label}>Offertory: CNH 173</span>
            <div className={styles.itemTitle}>For the Beauty of the Earth</div>
            <div className={styles.lyrics}>
              <div className={styles.verse}>
                1 For the beauty of the earth, for the glory of the skies, for
                the love which from our birth over and around us lies.
              </div>
              <div className={styles.refrain}>
                Refrain: Christ, our Lord, to you we raise this, our hymn of
                grateful praise.
              </div>
              <div className={styles.verse}>
                2 For the wonder of each hour of the day and of the night, hill
                and vale and tree and flower, sun and moon and stars of light,
                [Refrain]
              </div>
              <div className={styles.verse}>
                3 For the joy of human love, brother, sister, parent, child,
                friends on earth, and friends above, for all gentle thoughts and
                mild, [Refrain]
              </div>
              <div className={styles.verse}>
                4 For yourself, best gift divine, to the world so freely given,
                agent of God's grand design: peace on earth and joy in heaven.
                [Refrain]
              </div>
            </div>
          </div>
        </section>

        {/* --- COMMUNION SECTION --- */}
        <section className={styles.card}>
          <h2 className={styles.sectionTitle}>Communion Proper</h2>

          <div className={styles.serviceItem}>
            <div className={styles.itemTitle}>The Preparation of Gift</div>
            <p className={styles.prayerText}>
              <strong>President:</strong> Blessed are You, Lord God of all
              creation, through your goodness we have this bread to offer which
              the earth has given and human hands have made. It will become for
              us the Bread of Life.
            </p>
            <p className={styles.prayerText}>
              <strong>All:</strong> Blessed be God for ever. Amen.
            </p>
            <p className={styles.prayerText}>
              <strong>President:</strong> Blessed are You, Lord God of all
              creation, through Your goodness we have this wine to offer, fruit
              of the vine and work of human hands. It will become our spiritual
              drink.
            </p>
            <p className={styles.prayerText}>
              <strong>All:</strong> Blessed be God forever. Amen.
            </p>
            <p className={styles.rubric}>
              Then the President takes the offering in his hands and says with
              the people:
            </p>
            <p className={styles.prayerText}>
              <strong>All:</strong> Yours Lord, is the greatness, the power, the
              glory, the Splendor, and the majesty; for everything in heaven and
              on earth is Yours. All things come from you and of your Own do we
              give you.
            </p>
          </div>

          <div className={styles.serviceItem}>
            <div className={styles.itemTitle}>Eucharistic Prayer I</div>
            <p className={styles.rubric}>
              (Congregation remains standing) (The President faces the
              congregation and sings or says)
            </p>
            <div className={styles.responseRow}>
              <span className={styles.role}>President:</span>
              <span>The Lord be with you</span>
            </div>
            <div className={styles.responseRow}>
              <span className={styles.role}>All:</span>
              <span>And also with you.</span>
            </div>
            <div className={styles.responseRow}>
              <span className={styles.role}>President:</span>
              <span>Lift up your hearts.</span>
            </div>
            <div className={styles.responseRow}>
              <span className={styles.role}>All:</span>
              <span>We lift them to the Lord.</span>
            </div>
            <div className={styles.responseRow}>
              <span className={styles.role}>President:</span>
              <span>Let us give thanks to the Lord our God.</span>
            </div>
            <div className={styles.responseRow}>
              <span className={styles.role}>All:</span>
              <span>It is right to give Him thanks and praise</span>
            </div>

            <p className={styles.prayerText}>
              <strong>President:</strong> It is indeed right; it is our duty and
              joy at all times and in all places to give You thanks and praise
              Holy Father, Heavenly King, Almighty and Eternal God through Jesus
              Christ your only Son our Lord, for He is Your Living Word, through
              Him You have created all things from the beginning and formed us
              in Your own image. Through Him You have freed us from the slavery
              of sin, giving Him to be born as man and to die upon the cross;
              You raised Him from the dead and exalted Him to Your right hand on
              high, through Him You have sent upon us Your Holy and life-giving
              Spirit, and made us a people for Your own possession. Therefore,
              with angels and archangels and with all the company of heaven, we
              proclaim Your great and glorious name for ever praising You and
              saying:
            </p>

            <p className={styles.prayerText}>
              <strong>All:</strong> Holy, Holy, Holy Lord, God of power and
              might, heaven and earth are full of Your glory, Hosanna in the
              highest.
            </p>
            <p className={styles.prayerText}>
              <strong>President:</strong> Blessed is He who comes in the name of
              the Lord.
            </p>
            <p className={styles.prayerText}>
              <strong>All:</strong> Hosanna in the highest.
            </p>
            <p className={styles.rubric}>(The congregation may kneel)</p>
            <p className={styles.rubric}>(The President continues)</p>

            <p className={styles.prayerText}>
              <strong>President:</strong> Accept our praises, heavenly Father,
              through Your Son our Savior Jesus Christ; and as we follow His
              example and obey His command, grant that by the power of Your Holy
              Spirit these gifts of bread and wine may be to us, His Body and
              Blood; Who in the same night that He was betrayed, took bread and
              gave You thanks; He broke it and gave it to His disciples, saying:
              “Take, eat; this is My body which is given for You; do this in
              remembrance of me.” In the same way, after supper, He took the cup
              and gave You thanks. He gave it to them, saying: “Drink this, all
              of you; this is my Blood of the New Covenant, which is shed for
              you and for many for the forgiveness of sins. Do this as often as
              You drink it, in remembrance of me”. Therefore we proclaim the
              mystery of faith:
            </p>

            <p className={styles.prayerText}>
              <strong>All:</strong> Christ has died, Christ is risen; Christ
              will come again.
            </p>

            <p className={styles.prayerText}>
              <strong>President:</strong> Therefore, heavenly Father, we
              remember His offering of Himself made once for all upon the cross;
              and proclaim His mighty resurrection and glorious ascension. As we
              look for His coming in glory, we celebrate with this Bread and
              this Cup His one perfect sacrifice. Accept through Him our Great
              High Priest this our sacrifice of thanks and praise, and as we eat
              and drink these holy gifts in the presence of Your divine Majesty,
              renew us by Your Spirit, inspire us with Your love, and unite us
              in the body of Your Son Jesus Christ our Lord. Through Him, and
              with Him, and in Him, by the power of the Holy Spirit, with all
              who stand before You on earth and in heaven. We worship You,
              Father Almighty in songs of everlasting praise:
            </p>

            <p className={styles.prayerText}>
              <strong>All:</strong> Blessing and honor and glory and power be
              Yours for ever and ever. Amen.
            </p>

            <p className={styles.rubric}>
              The President breaks the consecrated bread, saying:
            </p>
            <p className={styles.prayerText}>
              <strong>President:</strong> The Bread which we break, is it not
              the communion of the Body of Christ. (He then lays his hand on the
              cup and says). The cup which we bless, is it not the communion of
              the Blood of Christ?
            </p>
            <p className={styles.prayerText}>
              <strong>All:</strong> Though we are many, we are one body, because
              we all share in one Bread.
            </p>

            <div className={styles.itemTitle}>Agnus Dei</div>
            <p className={styles.rubric}>(All kneeling)</p>
            <div className={styles.responseRow}>
              <span className={styles.role}>President:</span>
              <span>Lamb of God, You take away the sins of the world</span>
            </div>
            <div className={styles.responseRow}>
              <span className={styles.role}>All:</span>
              <span>Have mercy on us</span>
            </div>
            <div className={styles.responseRow}>
              <span className={styles.role}>President:</span>
              <span>Lamb of God, You take away the sins of the world</span>
            </div>
            <div className={styles.responseRow}>
              <span className={styles.role}>All:</span>
              <span>Have mercy on us</span>
            </div>
            <div className={styles.responseRow}>
              <span className={styles.role}>President:</span>
              <span>Lamb of God, You take away the sins of the world</span>
            </div>
            <div className={styles.responseRow}>
              <span className={styles.role}>All:</span>
              <span>Grant us peace.</span>
            </div>

            <div className={styles.itemTitle}>Prayer of Humble Access</div>
            <p className={styles.rubric}>(All kneeling)</p>
            <p className={styles.prayerText}>
              All: We do not presume to come to this Your table, Merciful Lord,
              trusting in our own righteousness but in Your Manifold and great
              mercies. We are not worthy so much as to gather up the crumbs
              under Your table, but You are the same Lord, whose nature is
              always to have mercy. Grant us, therefore, Gracious Lord, so to
              eat the flesh of Your Dear Son Jesus Christ, and to drink His
              Blood; that we may evermore dwell in Him and He in us. Amen.
            </p>
            <p className={styles.prayerText}>
              Draw near with faith; receive the Body of our Lord Jesus Christ
              which He gave for you and His Blood which He shed for you. Eat and
              drink in remembrance that He died for you and feed on Him in your
              heart by faith with thanksgiving.
            </p>
            <p className={styles.rubric}>
              The Minister says to each communicant: The body of Christ keep you
              in eternal life. The bloods of Christ keep you in eternal life.
            </p>
          </div>

          {/* Communion Hymns */}
          <div className={styles.serviceItem}>
            <div className={styles.itemTitle}>Hymn During Communion</div>

            <div className={styles.lyrics}>
              <strong>CNH 614</strong>
              <div className={styles.verse}>
                1 Draw near and take the body of your Lord, and drink the holy
                blood for you outpoured. Saved by his body and his holy blood,
                with souls refreshed we give our thanks to God.
              </div>
              <div className={styles.verse}>
                2 Christ our Redeemer, God’s eternal Son, has by his cross and
                blood the vict’ry won. He gave his life for greatest and for
                least, himself the off’ring and himself the priest.
              </div>
              <div className={styles.verse}>
                3 Let us approach with faithful hearts sincere and take the
                pledges of salvation here. Christ, who in this life all the
                saints defends, gives all believers life that never ends.
              </div>
              <div className={styles.verse}>
                4 With heav’nly bread he makes the hungry whole, gives living
                waters to the thirsting soul. Lord of the nations, to whom all
                must bow, in this great feast of love be with us now.
              </div>
            </div>

            <div className={styles.lyrics}>
              <strong>CNH 619</strong>
              <div className={styles.verse}>
                1 I hunger and I thirst: Jesu, my manna be; ye living waters,
                burst out of the rock for me.
              </div>
              <div className={styles.verse}>
                2 Thou bruised and broken Bread, my life-long wants supply; as
                living souls are fed, O feed me, or I die.
              </div>
              <div className={styles.verse}>
                3 Thou true life-giving Vine, let me thy sweetness prove; renew
                my life with thine, refresh my soul with love.
              </div>
              <div className={styles.verse}>
                4 Rough paths my feet have trod since first their course began:
                feed me, thou Bread of God; help me, thou Son of Man.
              </div>
              <div className={styles.verse}>
                5 For still the desert lies my thirsting soul before: O living
                waters, rise within me evermore.
              </div>
            </div>

            <div className={styles.lyrics}>
              <strong>CNH 629</strong>
              <div className={styles.verse}>
                1 Lord, enthroned in heav'nly splendor, first-begotten from the
                dead, Thou alone, our strong Defender, liftest up Thy people's
                head. Hallelujah! Hallelujah! Jesus, true and living Bread!
              </div>
              <div className={styles.verse}>
                2 Prince of Life, for us Thou livest, by Thy body souls are
                healed; Prince of Peace, Thy peace Thou givest, by Thy blood is
                pardon sealed. Hallelujah! Hallelujah! Word of God in flesh
                revealed.
              </div>
              <div className={styles.verse}>
                3 Paschal Lamb! Thine off'ring finished once for all when Thou
                wast slain, in its fullness undiminished shall forevermore
                remain. Hallelujah! Hallelujah! Cleansing souls from every
                stain.
              </div>
              <div className={styles.verse}>
                4 Great High Priest of our profession, thro' the veil Thou
                ent'redst in; by Thy mighty intercession grace and mercy Thou
                dost win. Hallelujah! Hallelujah! Only sacrifice for sin.
              </div>
              <div className={styles.verse}>
                5 Life-imparting heav'nly Manna, stricken Rock, with streaming
                side, heav'n and earth with loud hosanna worship Thee, the Lamb
                who died. Hallelujah! Hallelujah! Ris'n, ascended, glorified!
              </div>
            </div>

            <div className={styles.lyrics}>
              <strong>CNH 641</strong>
              <div className={styles.verse}>
                1 The King of love my shepherd is, whose goodness faileth never.
                I nothing lack if I am his, and he is mine forever.
              </div>
              <div className={styles.verse}>
                2 Where streams of living water flow, my ransomed soul he
                leadeth; and where the verdant pastures grow, with food
                celestial feedeth.
              </div>
              <div className={styles.verse}>
                3 Perverse and foolish, oft I strayed, but yet in love he sought
                me; and on his shoulder gently laid, and home, rejoicing,
                brought me.
              </div>
              <div className={styles.verse}>
                4 In death's dark vale I fear no ill, with thee, dear Lord,
                beside me; thy rod and staff my comfort still, thy cross before
                to guide me.
              </div>
              <div className={styles.verse}>
                5 Thou spreadst a table in my sight; thy unction grace
                bestoweth; and oh, what transport of delight from thy pure
                chalice floweth!
              </div>
              <div className={styles.verse}>
                6 And so through all the length of days, thy goodness faileth
                never; Good Shepherd, may I sing thy praise within thy house
                forever.
              </div>
            </div>
          </div>

          {/* After Communion */}
          <div className={styles.serviceItem}>
            <h3 className={styles.itemTitle}>After Communion</h3>
            <p className={styles.rubric}>
              Appropriate sentence may be said here (see Lectionary: Post
              Communion Sentence)
            </p>
            <p className={styles.prayerText}>
              <strong>President:</strong> As our Savior taught us so we pray.
            </p>
            <p className={styles.prayerText}>
              <strong>All:</strong> Our Father in Heaven, hallowed be your name,
              your Kingdom come, your will be done on earth as in heaven. Give
              us today our daily bread. Forgive us our sins as we forgive those
              who sin against us. Lead us not into temptations but deliver us
              from evil. For the kingdom, the power and the glory are yours now
              and forever. Amen.
            </p>
            <p className={styles.prayerText}>
              <strong>President:</strong> Father of all we give You thanks and
              praise, that when we were still far off You met us in Your Son and
              brought us home. Still far off You met us in Your Son and brought
              us home. Dying and living He declared Your love, gave us grace,
              and opened the gate of glory. Dying and living He declared Your
              love, gave us grace, and opened the gate of glory. May we who
              share Christ’s Body live His risen life. We who drink His cup,
              bring life to others. We whom the Spirit lights give light to the
              world. Keep us firm in the hope You have set before us. So we and
              Your children shall be free and the whole earth live to praise
              Your name; through Christ our Lord.
            </p>
            <p className={styles.prayerText}>
              <strong>All:</strong> Amen.
            </p>
            <p className={styles.prayerText}>
              <strong>All:</strong> Almighty God, we thank You for feeding us
              with the Body and Blood of Your Son Jesus Christ. Through Him we
              offer You our souls and bodies to be a living sacrifice. Send us
              out in the power of Your Spirit to live and work to Your praise
              and glory. Amen.
            </p>
          </div>

          <div className={styles.serviceItem}>
            <div className={styles.itemTitle}>Announcement</div>
            <div className={styles.itemTitle}>Signing of Marriage Document</div>
            <div className={styles.itemTitle}>Thanksgiving</div>
            <div className={styles.itemTitle}>Closing Prayer / Benediction</div>
            <div className={styles.itemTitle}>
              Photograph In Church With Bishop, Wife And Officiating Ministers
            </div>
          </div>

          <div className={styles.serviceItem}>
            <span className={styles.label}>Withdrawal Hymn: CNH 452</span>
            <div className={styles.itemTitle}>
              Guide Me, O Lord, Great Redeemer
            </div>
            <div className={styles.lyrics}>
              <div className={styles.verse}>
                1. Guide me, O Lord, Great Redeemer, Pilgrim through this barren
                land. I am weak, but You art mighty Hold me with Your powerful
                hand. Bread of heaven. Feed me till I want no more.
              </div>
              <div className={styles.verse}>
                2. Open now the crystal fountain Where the healing stream does
                flow Let the fire and cloudy pillar Lead me all my journey
                through. Strong Deliverer Be now still my Strength and Shield.
              </div>
              <div className={styles.verse}>
                3. Lord, I trust Your mighty power, Wondrous are Your works of
                old; You delivered them from slavery This for naught themselves
                had sold: You did conquer, Sin, and Satan and the grave,
              </div>
              <div className={styles.verse}>
                4. When I tread the verge of Jordan Bid my anxious fears subside
                Death of death, and hell’s destruction Land me safe on Canaan’s
                side Songs of praises I will to You ever sing.
              </div>
              <div className={styles.verse}>
                5. Musing on my habitation, Musing on my heavenly home. Fills my
                soul with holy longings, Come my Jesus, quickly come. O my
                Saviour, Lord, with You I long to be. Amen
              </div>
            </div>
          </div>
        </section>

        {/* --- PHOTOGRAPHS LIST --- */}
        <section className={styles.card}>
          <h2 className={styles.sectionTitle}>Order of Photograph</h2>
          <div className={styles.photoGrid}>
            <ul className={styles.cleanList}>
              <li>Couples with Christ Church Choir</li>
              <li>Couples with Praise Band</li>
              <li>Couples with Priests wives</li>
              <li>Bride alone</li>
              <li>Groom alone</li>
              <li>Couples alone</li>
              <li>Couples with Bride’s parents</li>
              <li>Couples with Bride’s family</li>
              <li>Couples with Both families</li>
              <li>Bride with Asoebi</li>
              <li>Groom with Grooms men</li>
              <li>Couple with both parents</li>
              <li>Couples with Committee of Friends</li>
              <li>Couples with A.Y.F</li>
              <li>Couples with Grooms parents</li>
              <li>Couples with Grooms family</li>
              <li>Both parents</li>
            </ul>
            <ul className={styles.cleanList}>
              <li>Couples with Chairman of the Occasion</li>
              <li>Couples with Mother of the day</li>
              <li>Best man and Bridesmaid</li>
              <li>Couples with Bride’s friends</li>
              <li>Couples with Groom’s friends</li>
              <li>Couples with Department of Nursing Staff</li>
              <li>Couples with Nurses</li>
              <li>Couples with Faculty of Allied Medical Sciences</li>
              <li>Couples with College of Medical Sciences</li>
              <li>Couples with ASUU</li>
              <li>Couples with Amnesty International Nigeria</li>
              <li>Couples with CMF</li>
              <li>Couples with Women Ministry</li>
              <li>Couples with ACM</li>
              <li>Couples with the Future</li>
            </ul>
          </div>
        </section>

        {/* --- RECEPTION PROGRAMME --- */}
        <section className={styles.card}>
          <h2 className={styles.sectionTitle}>Reception Programme</h2>
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              marginBottom: "1.5rem",
            }}
          >
            STARTS BY 1:30PM
          </p>
          <ul className={styles.cleanList} style={{ textAlign: "center" }}>
            <li>Opening Prayer</li>
            <li>Acknowledgment of Guest/ High Table</li>
            <li>Introduction of Parents</li>
            <li>Entrance of Brides Team & Grooms men</li>
            <li>Couple Entrance</li>
            <li>Chairman’s opening speech</li>
            <li>Couple Dance</li>
            <li>Cutting of Cake</li>
            <li>Toast</li>
            <li>Couple Feeding</li>
            <li>Refreshment</li>
            <li>Thanksgiving Prayer</li>
            <li>Photos</li>
            <li>Message from Friends/ Appreciation</li>
            <li>Closing Prayer/ Departure of Guests</li>
          </ul>
        </section>

        {/* --- APPRECIATION FOOTER --- */}
        <footer className={styles.footer}>
          <div className={styles.footerTitle}>Appreciation</div>
          <p
            style={{
              maxWidth: "600px",
              margin: "0 auto",
              marginBottom: "2rem",
            }}
          >
            We want to thank the almighty God for the guidance, health, and life
            throughout the period of preparation of our wedding. We wish to
            express our profound gratitude to you for your call, prayers,
            support during this period. A very big thank you to our parents,
            friends, and families. We pray the Good Lord to grant you a safe
            arrival to your various destinations in Jesus Name. Amen.
          </p>
          <p>© 2026. All Rights Reserved.</p>
        </footer>

        {/* --- STICKY CREATOR WATERMARK --- */}
        <a
          href="https://www.onyekachi.dev/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.watermark}
        >
          <span>✦</span> Website by{" "}
          <span style={{ fontWeight: "bolder" }}>KachiDeGreat</span>
        </a>
      </div>
    </div>
  );
};

export default WeddingBulletin;
