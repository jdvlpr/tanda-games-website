[1] INIT|P0|NAT:Bosnian|DEST:China|$2|FACEUP:[4:Learn from an Elder,5:Letter of Recommendation,6:Mental Fog,11:Certificate of Excellence,12:Insider,13:Letter of Invitation]
[1] INIT|P1|NAT:Chinese|DEST:Democratic Republic of Congo|$6|FACEUP:[4:Cookies for Neighbor from Destination,5:Payday,6:Pandemic / Economic Stimulus,11:Endorsement from Royalty,12:Language Classes,13:Enter Luxury Travel Club]
[1] T1|P0|BUY:Certificate of Excellence|FROM:P0|COST:2
[1] T1|P0|REV|S7:Payday
[2] T2|P1|PAY_FEE:1|TO:P0
[2] T2|P1|BUY:Letter of Invitation|FROM:P0|COST:4
[2] T2|P0|REV|S10:Pet Passport
[3] T3|P0|SELL:Certificate of Excellence|GAIN:2
[3] T3|P0|ACT:Payday
[3] T3|PAYDAY|SALARIES:[1,1]
[4] T4|P1|STEAL:Passport|SKIP_NEXT
[5] T5|P0|BUY:Pet Passport|FROM:P0|COST:4
[6] T6|P1|SKIP_TURN
[7] T7|P0|SELL:Pet Passport|GAIN:2
[7] T7|P0|PAY_FEE:1|TO:P1
[7] T7|P0|DISC:Language Classes|FROM:P1|GAIN:2
[8] T8|P1|BUY:Endorsement from Royalty|FROM:P1|COST:3
[8] T8|P1|REV|S7:Payday
[8] T8|P1|REV|S8:Coffee with Airport Employee
[9] T9|P0|PAY_FEE:2|TO:P1
[9] T9|P0|DISC:Enter Luxury Travel Club|FROM:P1|GAIN:2
[9] T9|P1|REV|S9:Notebook
[9] T9|P1|REV|S10:Payday
[10] T10|P1|BUY:Notebook|FROM:P1|COST:2
[11] T11|P0|ACT:Insider
[11] T11|P0|KEEP:Insider
[11] T11|P0|REV|S8:Payday
[11] T11|P0|REV|S9:International Driving Permit
[12] T12|P1|SELL:Notebook|GAIN:2
[12] T12|P1|STEAL:Ticket|SKIP_NEXT
[12] T12|P1|TICKET_PASSPORT_BONUS|GAIN:1A
[13] T13|P0|ACT:Payday
[13] T13|PAYDAY|SALARIES:[2,1]
[14] T14|P1|SKIP_TURN
[15] T15|P0|BUY:International Driving Permit|FROM:P0|COST:4
[16] T16|P1|PAY_FEE:2|TO:P0
[16] T16|P1|DISC:Letter of Recommendation|FROM:P0|GAIN:2
[17] T17|P0|BUY:Learn from an Elder|FROM:P0|COST:3
[17] T17|P0|REV|S0:Payday
[17] T17|P0|REV|S1:Stellar Reputation
[18] T18|P1|ACT:Payday
[18] T18|PAYDAY|SALARIES:[2,1]
[19] T19|P0|STEAL:Passport|SKIP_NEXT
[20] T20|P1|ACT:Payday
[20] T20|PAYDAY|SALARIES:[2,1]
[21] T21|P0|SKIP_TURN
[22] T22|P1|ACT:Pandemic / Economic Stimulus
[22] T22|ROLL_D6:4
[22] T22|P1|ACT:PANDEMIC_STIMULUS|DELTA:[-4,-4]
[22] T22|P1|REV|S3:Swap Wallets
[23] T23|P0|SELL:International Driving Permit|GAIN:2
[23] T23|P0|STEAL:Ticket|SKIP_NEXT
[23] T23|P0|TICKET_PASSPORT_BONUS|GAIN:1A
[24] T24|P1|SELL:Letter of Invitation|GAIN:2
[24] T24|P1|ACT:Swap Wallets
[24] T24|P1|ACT:Swap Wallets|SWAP:P0
[25] T25|P0|SKIP_TURN
[26] T26|P1|DISC:Coffee with Airport Employee|FROM:P1|GAIN:2
[27] T27|P0|ACT:Payday
[27] T27|PAYDAY|SALARIES:[2,1]
[28] T28|P1|ACT:Payday
[28] T28|PAYDAY|SALARIES:[2,1]
[28] T28|P1|REV|S2:Pandemic / Economic Stimulus
[29] T29|P0|ACT:Mental Fog
[29] T29|P0|ACT:Mental Fog|LOSS:1
[29] T29|P0|REV|S2:Residence Address in Destination
[29] T29|P0|REV|S3:Island Paradise
[30] T30|P1|ACT:Pandemic / Economic Stimulus
[30] T30|ROLL_D6:1
[30] T30|P1|ACT:PANDEMIC_STIMULUS|DELTA:[1,1]
[31] T31|P0|BUY:Residence Address in Destination|FROM:P0|COST:3
[32] T32|P1|PAY_FEE:3|TO:P0
[32] T32|P1|ACT:Stellar Reputation
[32] T32|P1|KEEP:Stellar Reputation
[33] T33|P0|ACT:Island Paradise
[33] T33|P0|ACT:Island Paradise|DELTA:[1,1]
[34] T34|P1|DISC:Cookies for Neighbor from Destination|FROM:P1|GAIN:2
[34] T34|P1|REV|S0:Payday
[34] T34|P1|REV|S1:Rummage Sale
[35] T35|P0|PAY_FEE:3|TO:P1
[35] T35|P0|ACT:Rummage Sale
[35] T35|P0|ACT:Rummage Sale|GAIN:3
[36] T36|P1|ACT:Payday
[36] T36|PAYDAY|SALARIES:[2,1]
[36] PHASE2_START
[36] PHASE2|P0|TRADE|$10:+3A|PEN_D:-3A|TOTAL_A:1
[36] PHASE2|P1|TRADE|$6:+2A|PEN_D:-2A|TOTAL_A:1
[36] PHASE2|P0|SELECT_LANE:Lane 1|TKN:7
[36] PHASE2|P0|CROSS:FAIL_LOW_A
[36] PHASE2|P1|SELECT_LANE:Lane 1|TKN:6
[36] PHASE2|P1|CROSS:FAIL_LOW_A
[36] GAME_OVER|WINNER (no one crossed, most Money): Player 2 ($5)
