/**
 * BSD 3-Clause License
 * 
 * Copyright (c) 2018, Carlos Henrique
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 * 
 ** Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 * 
 ** Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation
 *  and/or other materials provided with the distribution.
 * 
 ** Neither the name of the copyright holder nor the names of its
 *  contributors may be used to endorse or promote products derived from
 *  this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function(window) {
    /**
     * O CÓDIGO ABAIXO NÃO É DE MINHA AUTORIA; FIZ APENAS ADAPTAÇÕES
     * PARA USO COM AS PROMISES E TAMBÉM DISPARAR EVENTOS PELO OBJETO
     * 'window' DO NAVEGADOR;
     * LINK DO CÓDIGO BASE: https://stackoverflow.com/questions/20194722/can-you-get-a-users-local-lan-ip-address-via-javascript/48571757#48571757
     *
     * VERIFICAR OUTRAS FORMAS DE FAZER ISSO EM:
     *   https://github.com/diafygi/webrtc-ips
     */
    var addressPromisse = new Promise(function(resolve, reject)
    {
        window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection || false;

        if(window.RTCPeerConnection)
        {
            var ip = [];
            var pc = new RTCPeerConnection({iceServers:[]}), noop = function(){};
            pc.createDataChannel('');
            pc.createOffer(pc.setLocalDescription.bind(pc), noop);

            pc.onicecandidate = function(event)
            {
                if (event && event.candidate && event.candidate.candidate)
                {
                    var s = event.candidate.candidate.split('\n');
                    ip.push(s[0].split(' ')[4]);
                    resolve(ip[0]);
                }
            }
        }
        else
        {
            reject("0.0.0.0");
        }
    }).then(function(ipAddress) {
        var event = new CustomEvent('loadedAddress', {
            'detail' : {
                'address' : ipAddress
            }
        });
        window.dispatchEvent(event);
    }).catch(function(ipFail) {
        var event = new CustomEvent('loadedAddress', {
            'detail' : {
                'address' : ipFail
            }
        });
        window.dispatchEvent(event);
    });
}) (window);
